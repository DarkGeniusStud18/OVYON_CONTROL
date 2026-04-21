import crypto from 'crypto';
import { WebAuthnCredentialEntry } from '../devices/stateManager';

export interface RegisterBeginOptions {
  challenge: string;
  rp: { name: string; id: string };
  user: { id: string; name: string; displayName: string };
  pubKeyCredParams: Array<{ type: 'public-key'; alg: number }>;
  timeout: number;
  attestation: 'none';
  authenticatorSelection: {
    residentKey: 'preferred' | 'required' | 'discouraged';
    userVerification: 'required' | 'preferred' | 'discouraged';
  };
  excludeCredentials: Array<{ type: 'public-key'; id: string }>;
}

export interface LoginBeginOptions {
  challenge: string;
  timeout: number;
  rpId: string;
  userVerification: 'required' | 'preferred' | 'discouraged';
  allowCredentials: Array<{ type: 'public-key'; id: string }>;
}

export interface ParsedAuthenticatorData {
  rpIdHash: Buffer;
  flags: number;
  signCount: number;
}

export const registerAlgorithms = [
  { type: 'public-key' as const, alg: -7 },
  { type: 'public-key' as const, alg: -257 }
];

export function toBase64Url(input: Buffer): string {
  return input.toString('base64url');
}

export function fromBase64Url(input: string): Buffer {
  return Buffer.from(input, 'base64url');
}

export function randomChallenge(size = 32): string {
  return toBase64Url(crypto.randomBytes(size));
}

export function randomUserHandle(): string {
  return toBase64Url(crypto.randomBytes(32));
}

export function parseClientDataJSON(clientDataJSONb64: string): {
  type: string;
  challenge: string;
  origin: string;
} {
  const decoded = fromBase64Url(clientDataJSONb64).toString('utf-8');
  return JSON.parse(decoded) as { type: string; challenge: string; origin: string };
}

export function parseAuthenticatorData(authDataB64: string): ParsedAuthenticatorData {
  const raw = fromBase64Url(authDataB64);
  if (raw.length < 37) {
    throw new Error('authenticatorData invalide');
  }
  return {
    rpIdHash: raw.subarray(0, 32),
    flags: raw[32],
    signCount: raw.readUInt32BE(33)
  };
}

export function isUserPresent(flags: number): boolean {
  return (flags & 0x01) !== 0;
}

export function isUserVerified(flags: number): boolean {
  return (flags & 0x04) !== 0;
}

export function verifyRpIdHash(authDataB64: string, rpId: string): boolean {
  const { rpIdHash } = parseAuthenticatorData(authDataB64);
  const expected = crypto.createHash('sha256').update(rpId).digest();
  return rpIdHash.equals(expected);
}

export function publicKeyDerToPem(publicKeyB64: string): string {
  const key = crypto.createPublicKey({
    key: fromBase64Url(publicKeyB64),
    format: 'der',
    type: 'spki'
  });
  return key.export({ format: 'pem', type: 'spki' }).toString();
}

export function verifyAssertionSignature(input: {
  credential: WebAuthnCredentialEntry;
  authenticatorDataB64: string;
  clientDataJSONB64: string;
  signatureB64: string;
}): boolean {
  const authenticatorData = fromBase64Url(input.authenticatorDataB64);
  const clientDataJSON = fromBase64Url(input.clientDataJSONB64);
  const signature = fromBase64Url(input.signatureB64);
  const clientDataHash = crypto.createHash('sha256').update(clientDataJSON).digest();
  const signedPayload = Buffer.concat([authenticatorData, clientDataHash]);

  const key = crypto.createPublicKey(input.credential.public_key_pem);
  return crypto.verify('sha256', signedPayload, key, signature);
}

export function buildRegisterBeginOptions(input: {
  challenge: string;
  rpId: string;
  rpName: string;
  username: string;
  displayName: string;
  userHandle: string;
  existingCredentials: WebAuthnCredentialEntry[];
}): RegisterBeginOptions {
  return {
    challenge: input.challenge,
    rp: {
      name: input.rpName,
      id: input.rpId
    },
    user: {
      id: input.userHandle,
      name: input.username,
      displayName: input.displayName
    },
    pubKeyCredParams: registerAlgorithms,
    timeout: 60000,
    attestation: 'none',
    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'required'
    },
    excludeCredentials: input.existingCredentials.map((credential) => ({
      type: 'public-key',
      id: credential.credential_id
    }))
  };
}

export function buildLoginBeginOptions(input: {
  challenge: string;
  rpId: string;
  credentials: WebAuthnCredentialEntry[];
}): LoginBeginOptions {
  return {
    challenge: input.challenge,
    timeout: 60000,
    rpId: input.rpId,
    userVerification: 'required',
    allowCredentials: input.credentials.map((credential) => ({
      type: 'public-key',
      id: credential.credential_id
    }))
  };
}
