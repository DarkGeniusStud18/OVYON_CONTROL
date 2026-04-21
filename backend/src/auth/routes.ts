import express from 'express';
import logger from '../services/logger';
import { stateManager } from '../devices/stateManager';
import {
  buildLoginBeginOptions,
  buildRegisterBeginOptions,
  isUserPresent,
  isUserVerified,
  parseAuthenticatorData,
  parseClientDataJSON,
  publicKeyDerToPem,
  randomChallenge,
  randomUserHandle,
  verifyAssertionSignature,
  verifyRpIdHash
} from './webauthn';

const router = express.Router();

function normalizeUsername(input: string): string {
  return input.trim().toLowerCase();
}

function getRpId(): string {
  return process.env.WEBAUTHN_RP_ID || process.env.WEBAUTHN_RPID || 'localhost';
}

function getRpName(): string {
  return process.env.WEBAUTHN_RP_NAME || 'OVYON Control';
}

function getAllowedOrigins(req: express.Request): string[] {
  const envOrigins = (process.env.WEBAUTHN_ALLOWED_ORIGINS || process.env.WEBAUTHN_ORIGIN || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  const host = req.get('host');
  const guessedHostOrigin = host ? `http://${host}` : null;

  const defaults = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3001',
    'http://127.0.0.1:3001'
  ];

  return [...envOrigins, ...defaults, ...(guessedHostOrigin ? [guessedHostOrigin] : [])];
}

function assertAllowedOrigin(origin: string, req: express.Request): void {
  const allowed = getAllowedOrigins(req);
  if (!allowed.includes(origin)) {
    throw new Error(`Origin non autorisee: ${origin}`);
  }
}

router.post('/register/begin', async (req, res) => {
  try {
    const username = normalizeUsername(String(req.body?.username || ''));
    const displayName = String(req.body?.displayName || username).trim();
    if (!username) {
      res.status(400).json({ success: false, message: 'username requis' });
      return;
    }

    const user = await stateManager.upsertAuthUser(username, displayName);
    const existingCredentials = await stateManager.getCredentialsForUser(user.id);
    const challenge = randomChallenge();

    await stateManager.storeAuthChallenge(challenge, username, 'register');
    await stateManager.deleteExpiredAuthChallenges();

    res.json({
      success: true,
      options: buildRegisterBeginOptions({
        challenge,
        rpId: getRpId(),
        rpName: getRpName(),
        username,
        displayName: user.display_name,
        userHandle: randomUserHandle(),
        existingCredentials
      })
    });
  } catch (error) {
    logger.error('Auth register/begin error', { error });
    res.status(500).json({ success: false, message: 'Erreur serveur register begin' });
  }
});

router.post('/register/finish', async (req, res) => {
  try {
    const username = normalizeUsername(String(req.body?.username || ''));
    const credential = req.body?.credential as any;
    const response = credential?.response;
    if (!username || !credential?.id || !response?.clientDataJSON || !response?.publicKey) {
      res.status(400).json({ success: false, message: 'Payload register invalide' });
      return;
    }

    const clientData = parseClientDataJSON(response.clientDataJSON);
    if (clientData.type !== 'webauthn.create') {
      res.status(400).json({ success: false, message: 'Type WebAuthn invalide pour register' });
      return;
    }
    assertAllowedOrigin(clientData.origin, req);

    const challengeOk = await stateManager.consumeAuthChallenge(clientData.challenge, username, 'register');
    if (!challengeOk) {
      res.status(400).json({ success: false, message: 'Challenge register invalide ou expire' });
      return;
    }

    const user = await stateManager.getAuthUserByUsername(username);
    if (!user) {
      res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
      return;
    }

    const publicKeyPem = publicKeyDerToPem(response.publicKey);
    await stateManager.addWebAuthnCredential({
      userId: user.id,
      credentialId: String(credential.id),
      publicKeyPem,
      algorithm: Number(response.publicKeyAlgorithm ?? -7),
      transports: Array.isArray(response.transports) ? response.transports : [],
      signCount: 0
    });

    res.json({ success: true, verified: true });
  } catch (error) {
    logger.error('Auth register/finish error', { error });
    res.status(400).json({ success: false, message: 'Verification register echouee' });
  }
});

router.post('/login/begin', async (req, res) => {
  try {
    const username = normalizeUsername(String(req.body?.username || ''));
    if (!username) {
      res.status(400).json({ success: false, message: 'username requis' });
      return;
    }

    const user = await stateManager.getAuthUserByUsername(username);
    if (!user) {
      res.status(404).json({ success: false, message: 'Utilisateur non enregistre' });
      return;
    }
    const credentials = await stateManager.getCredentialsForUser(user.id);
    if (!credentials.length) {
      res.status(404).json({ success: false, message: 'Aucun credential WebAuthn' });
      return;
    }

    const challenge = randomChallenge();
    await stateManager.storeAuthChallenge(challenge, username, 'login');
    await stateManager.deleteExpiredAuthChallenges();

    res.json({
      success: true,
      options: buildLoginBeginOptions({
        challenge,
        rpId: getRpId(),
        credentials
      })
    });
  } catch (error) {
    logger.error('Auth login/begin error', { error });
    res.status(500).json({ success: false, message: 'Erreur serveur login begin' });
  }
});

router.post('/login/finish', async (req, res) => {
  try {
    const username = normalizeUsername(String(req.body?.username || ''));
    const credential = req.body?.credential as any;
    const response = credential?.response;

    if (
      !username ||
      !credential?.id ||
      !response?.clientDataJSON ||
      !response?.authenticatorData ||
      !response?.signature
    ) {
      res.status(400).json({ success: false, message: 'Payload login invalide' });
      return;
    }

    const clientData = parseClientDataJSON(response.clientDataJSON);
    if (clientData.type !== 'webauthn.get') {
      res.status(400).json({ success: false, message: 'Type WebAuthn invalide pour login' });
      return;
    }
    assertAllowedOrigin(clientData.origin, req);

    const challengeOk = await stateManager.consumeAuthChallenge(clientData.challenge, username, 'login');
    if (!challengeOk) {
      res.status(400).json({ success: false, message: 'Challenge login invalide ou expire' });
      return;
    }

    if (!verifyRpIdHash(response.authenticatorData, getRpId())) {
      res.status(400).json({ success: false, message: 'RP ID hash invalide' });
      return;
    }

    const credentialRecord = await stateManager.getCredentialById(String(credential.id));
    if (!credentialRecord) {
      res.status(404).json({ success: false, message: 'Credential inconnu' });
      return;
    }

    const user = await stateManager.getAuthUserByUsername(username);
    if (!user || user.id !== credentialRecord.user_id) {
      res.status(403).json({ success: false, message: 'Credential non lie a cet utilisateur' });
      return;
    }

    const authData = parseAuthenticatorData(response.authenticatorData);
    if (!isUserPresent(authData.flags)) {
      res.status(400).json({ success: false, message: 'User presence absente' });
      return;
    }
    if (!isUserVerified(authData.flags)) {
      res.status(400).json({ success: false, message: 'Verification biometrie requise' });
      return;
    }

    if (credentialRecord.sign_count > 0 && authData.signCount <= credentialRecord.sign_count) {
      res.status(400).json({ success: false, message: 'Compteur WebAuthn invalide (possible clone)' });
      return;
    }

    const signatureOk = verifyAssertionSignature({
      credential: credentialRecord,
      authenticatorDataB64: response.authenticatorData,
      clientDataJSONB64: response.clientDataJSON,
      signatureB64: response.signature
    });
    if (!signatureOk) {
      res.status(400).json({ success: false, message: 'Signature WebAuthn invalide' });
      return;
    }

    await stateManager.updateCredentialCounter(credentialRecord.credential_id, authData.signCount);
    const sessionToken = await stateManager.createAuthSession(user.id, 10 * 60);
    await stateManager.deleteExpiredAuthSessions();

    res.json({
      success: true,
      verified: true,
      tokenType: 'Bearer',
      sessionToken,
      expiresIn: 600,
      user: {
        username: user.username,
        displayName: user.display_name
      }
    });
  } catch (error) {
    logger.error('Auth login/finish error', { error });
    res.status(400).json({ success: false, message: 'Verification login echouee' });
  }
});

router.get('/status/:username', async (req, res) => {
  try {
    const username = normalizeUsername(String(req.params.username || ''));
    if (!username) {
      res.status(400).json({ success: false, message: 'username requis' });
      return;
    }
    const user = await stateManager.getAuthUserByUsername(username);
    if (!user) {
      res.json({ success: true, registered: false, credentials: 0 });
      return;
    }
    const credentials = await stateManager.getCredentialsForUser(user.id);
    res.json({
      success: true,
      registered: credentials.length > 0,
      credentials: credentials.length
    });
  } catch (error) {
    logger.error('Auth status error', { error });
    res.status(500).json({ success: false, message: 'Erreur serveur auth status' });
  }
});

router.post('/logout', async (req, res) => {
  try {
    const authHeader = String(req.headers.authorization || '');
    const token = authHeader.toLowerCase().startsWith('bearer ')
      ? authHeader.slice(7).trim()
      : '';

    if (!token) {
      res.json({ success: true });
      return;
    }

    await stateManager.revokeAuthSession(token);
    res.json({ success: true });
  } catch (error) {
    logger.error('Auth logout error', { error });
    res.status(500).json({ success: false, message: 'Erreur serveur logout' });
  }
});

export default router;
