"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("../services/logger"));
const stateManager_1 = require("../devices/stateManager");
const webauthn_1 = require("./webauthn");
const router = express_1.default.Router();
function normalizeUsername(input) {
    return input.trim().toLowerCase();
}
function getRpId() {
    return process.env.WEBAUTHN_RP_ID || process.env.WEBAUTHN_RPID || 'localhost';
}
function getRpName() {
    return process.env.WEBAUTHN_RP_NAME || 'OVYON Control';
}
function getAllowedOrigins(req) {
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
function assertAllowedOrigin(origin, req) {
    const allowed = getAllowedOrigins(req);
    if (!allowed.includes(origin)) {
        throw new Error(`Origin non autorisee: ${origin}`);
    }
}
router.post('/register/begin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const username = normalizeUsername(String(((_a = req.body) === null || _a === void 0 ? void 0 : _a.username) || ''));
        const displayName = String(((_b = req.body) === null || _b === void 0 ? void 0 : _b.displayName) || username).trim();
        if (!username) {
            res.status(400).json({ success: false, message: 'username requis' });
            return;
        }
        const user = yield stateManager_1.stateManager.upsertAuthUser(username, displayName);
        const existingCredentials = yield stateManager_1.stateManager.getCredentialsForUser(user.id);
        const challenge = (0, webauthn_1.randomChallenge)();
        yield stateManager_1.stateManager.storeAuthChallenge(challenge, username, 'register');
        yield stateManager_1.stateManager.deleteExpiredAuthChallenges();
        res.json({
            success: true,
            options: (0, webauthn_1.buildRegisterBeginOptions)({
                challenge,
                rpId: getRpId(),
                rpName: getRpName(),
                username,
                displayName: user.display_name,
                userHandle: (0, webauthn_1.randomUserHandle)(),
                existingCredentials
            })
        });
    }
    catch (error) {
        logger_1.default.error('Auth register/begin error', { error });
        res.status(500).json({ success: false, message: 'Erreur serveur register begin' });
    }
}));
router.post('/register/finish', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const username = normalizeUsername(String(((_a = req.body) === null || _a === void 0 ? void 0 : _a.username) || ''));
        const credential = (_b = req.body) === null || _b === void 0 ? void 0 : _b.credential;
        const response = credential === null || credential === void 0 ? void 0 : credential.response;
        if (!username || !(credential === null || credential === void 0 ? void 0 : credential.id) || !(response === null || response === void 0 ? void 0 : response.clientDataJSON) || !(response === null || response === void 0 ? void 0 : response.publicKey)) {
            res.status(400).json({ success: false, message: 'Payload register invalide' });
            return;
        }
        const clientData = (0, webauthn_1.parseClientDataJSON)(response.clientDataJSON);
        if (clientData.type !== 'webauthn.create') {
            res.status(400).json({ success: false, message: 'Type WebAuthn invalide pour register' });
            return;
        }
        assertAllowedOrigin(clientData.origin, req);
        const challengeOk = yield stateManager_1.stateManager.consumeAuthChallenge(clientData.challenge, username, 'register');
        if (!challengeOk) {
            res.status(400).json({ success: false, message: 'Challenge register invalide ou expire' });
            return;
        }
        const user = yield stateManager_1.stateManager.getAuthUserByUsername(username);
        if (!user) {
            res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
            return;
        }
        const publicKeyPem = (0, webauthn_1.publicKeyDerToPem)(response.publicKey);
        yield stateManager_1.stateManager.addWebAuthnCredential({
            userId: user.id,
            credentialId: String(credential.id),
            publicKeyPem,
            algorithm: Number((_c = response.publicKeyAlgorithm) !== null && _c !== void 0 ? _c : -7),
            transports: Array.isArray(response.transports) ? response.transports : [],
            signCount: 0
        });
        res.json({ success: true, verified: true });
    }
    catch (error) {
        logger_1.default.error('Auth register/finish error', { error });
        res.status(400).json({ success: false, message: 'Verification register echouee' });
    }
}));
router.post('/login/begin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const username = normalizeUsername(String(((_a = req.body) === null || _a === void 0 ? void 0 : _a.username) || ''));
        if (!username) {
            res.status(400).json({ success: false, message: 'username requis' });
            return;
        }
        const user = yield stateManager_1.stateManager.getAuthUserByUsername(username);
        if (!user) {
            res.status(404).json({ success: false, message: 'Utilisateur non enregistre' });
            return;
        }
        const credentials = yield stateManager_1.stateManager.getCredentialsForUser(user.id);
        if (!credentials.length) {
            res.status(404).json({ success: false, message: 'Aucun credential WebAuthn' });
            return;
        }
        const challenge = (0, webauthn_1.randomChallenge)();
        yield stateManager_1.stateManager.storeAuthChallenge(challenge, username, 'login');
        yield stateManager_1.stateManager.deleteExpiredAuthChallenges();
        res.json({
            success: true,
            options: (0, webauthn_1.buildLoginBeginOptions)({
                challenge,
                rpId: getRpId(),
                credentials
            })
        });
    }
    catch (error) {
        logger_1.default.error('Auth login/begin error', { error });
        res.status(500).json({ success: false, message: 'Erreur serveur login begin' });
    }
}));
router.post('/login/finish', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const username = normalizeUsername(String(((_a = req.body) === null || _a === void 0 ? void 0 : _a.username) || ''));
        const credential = (_b = req.body) === null || _b === void 0 ? void 0 : _b.credential;
        const response = credential === null || credential === void 0 ? void 0 : credential.response;
        if (!username ||
            !(credential === null || credential === void 0 ? void 0 : credential.id) ||
            !(response === null || response === void 0 ? void 0 : response.clientDataJSON) ||
            !(response === null || response === void 0 ? void 0 : response.authenticatorData) ||
            !(response === null || response === void 0 ? void 0 : response.signature)) {
            res.status(400).json({ success: false, message: 'Payload login invalide' });
            return;
        }
        const clientData = (0, webauthn_1.parseClientDataJSON)(response.clientDataJSON);
        if (clientData.type !== 'webauthn.get') {
            res.status(400).json({ success: false, message: 'Type WebAuthn invalide pour login' });
            return;
        }
        assertAllowedOrigin(clientData.origin, req);
        const challengeOk = yield stateManager_1.stateManager.consumeAuthChallenge(clientData.challenge, username, 'login');
        if (!challengeOk) {
            res.status(400).json({ success: false, message: 'Challenge login invalide ou expire' });
            return;
        }
        if (!(0, webauthn_1.verifyRpIdHash)(response.authenticatorData, getRpId())) {
            res.status(400).json({ success: false, message: 'RP ID hash invalide' });
            return;
        }
        const credentialRecord = yield stateManager_1.stateManager.getCredentialById(String(credential.id));
        if (!credentialRecord) {
            res.status(404).json({ success: false, message: 'Credential inconnu' });
            return;
        }
        const user = yield stateManager_1.stateManager.getAuthUserByUsername(username);
        if (!user || user.id !== credentialRecord.user_id) {
            res.status(403).json({ success: false, message: 'Credential non lie a cet utilisateur' });
            return;
        }
        const authData = (0, webauthn_1.parseAuthenticatorData)(response.authenticatorData);
        if (!(0, webauthn_1.isUserPresent)(authData.flags)) {
            res.status(400).json({ success: false, message: 'User presence absente' });
            return;
        }
        if (!(0, webauthn_1.isUserVerified)(authData.flags)) {
            res.status(400).json({ success: false, message: 'Verification biometrie requise' });
            return;
        }
        if (credentialRecord.sign_count > 0 && authData.signCount <= credentialRecord.sign_count) {
            res.status(400).json({ success: false, message: 'Compteur WebAuthn invalide (possible clone)' });
            return;
        }
        const signatureOk = (0, webauthn_1.verifyAssertionSignature)({
            credential: credentialRecord,
            authenticatorDataB64: response.authenticatorData,
            clientDataJSONB64: response.clientDataJSON,
            signatureB64: response.signature
        });
        if (!signatureOk) {
            res.status(400).json({ success: false, message: 'Signature WebAuthn invalide' });
            return;
        }
        yield stateManager_1.stateManager.updateCredentialCounter(credentialRecord.credential_id, authData.signCount);
        const sessionToken = yield stateManager_1.stateManager.createAuthSession(user.id, 10 * 60);
        yield stateManager_1.stateManager.deleteExpiredAuthSessions();
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
    }
    catch (error) {
        logger_1.default.error('Auth login/finish error', { error });
        res.status(400).json({ success: false, message: 'Verification login echouee' });
    }
}));
router.get('/status/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = normalizeUsername(String(req.params.username || ''));
        if (!username) {
            res.status(400).json({ success: false, message: 'username requis' });
            return;
        }
        const user = yield stateManager_1.stateManager.getAuthUserByUsername(username);
        if (!user) {
            res.json({ success: true, registered: false, credentials: 0 });
            return;
        }
        const credentials = yield stateManager_1.stateManager.getCredentialsForUser(user.id);
        res.json({
            success: true,
            registered: credentials.length > 0,
            credentials: credentials.length
        });
    }
    catch (error) {
        logger_1.default.error('Auth status error', { error });
        res.status(500).json({ success: false, message: 'Erreur serveur auth status' });
    }
}));
router.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = String(req.headers.authorization || '');
        const token = authHeader.toLowerCase().startsWith('bearer ')
            ? authHeader.slice(7).trim()
            : '';
        if (!token) {
            res.json({ success: true });
            return;
        }
        yield stateManager_1.stateManager.revokeAuthSession(token);
        res.json({ success: true });
    }
    catch (error) {
        logger_1.default.error('Auth logout error', { error });
        res.status(500).json({ success: false, message: 'Erreur serveur logout' });
    }
}));
exports.default = router;
