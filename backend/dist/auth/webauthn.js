"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAlgorithms = void 0;
exports.toBase64Url = toBase64Url;
exports.fromBase64Url = fromBase64Url;
exports.randomChallenge = randomChallenge;
exports.randomUserHandle = randomUserHandle;
exports.parseClientDataJSON = parseClientDataJSON;
exports.parseAuthenticatorData = parseAuthenticatorData;
exports.isUserPresent = isUserPresent;
exports.isUserVerified = isUserVerified;
exports.verifyRpIdHash = verifyRpIdHash;
exports.publicKeyDerToPem = publicKeyDerToPem;
exports.verifyAssertionSignature = verifyAssertionSignature;
exports.buildRegisterBeginOptions = buildRegisterBeginOptions;
exports.buildLoginBeginOptions = buildLoginBeginOptions;
const crypto_1 = __importDefault(require("crypto"));
exports.registerAlgorithms = [
    { type: 'public-key', alg: -7 },
    { type: 'public-key', alg: -257 }
];
function toBase64Url(input) {
    return input.toString('base64url');
}
function fromBase64Url(input) {
    return Buffer.from(input, 'base64url');
}
function randomChallenge(size = 32) {
    return toBase64Url(crypto_1.default.randomBytes(size));
}
function randomUserHandle() {
    return toBase64Url(crypto_1.default.randomBytes(32));
}
function parseClientDataJSON(clientDataJSONb64) {
    const decoded = fromBase64Url(clientDataJSONb64).toString('utf-8');
    return JSON.parse(decoded);
}
function parseAuthenticatorData(authDataB64) {
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
function isUserPresent(flags) {
    return (flags & 0x01) !== 0;
}
function isUserVerified(flags) {
    return (flags & 0x04) !== 0;
}
function verifyRpIdHash(authDataB64, rpId) {
    const { rpIdHash } = parseAuthenticatorData(authDataB64);
    const expected = crypto_1.default.createHash('sha256').update(rpId).digest();
    return rpIdHash.equals(expected);
}
function publicKeyDerToPem(publicKeyB64) {
    const key = crypto_1.default.createPublicKey({
        key: fromBase64Url(publicKeyB64),
        format: 'der',
        type: 'spki'
    });
    return key.export({ format: 'pem', type: 'spki' }).toString();
}
function verifyAssertionSignature(input) {
    const authenticatorData = fromBase64Url(input.authenticatorDataB64);
    const clientDataJSON = fromBase64Url(input.clientDataJSONB64);
    const signature = fromBase64Url(input.signatureB64);
    const clientDataHash = crypto_1.default.createHash('sha256').update(clientDataJSON).digest();
    const signedPayload = Buffer.concat([authenticatorData, clientDataHash]);
    const key = crypto_1.default.createPublicKey(input.credential.public_key_pem);
    return crypto_1.default.verify('sha256', signedPayload, key, signature);
}
function buildRegisterBeginOptions(input) {
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
        pubKeyCredParams: exports.registerAlgorithms,
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
function buildLoginBeginOptions(input) {
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
