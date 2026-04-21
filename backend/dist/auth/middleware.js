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
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireWebAuthnSession = requireWebAuthnSession;
const stateManager_1 = require("../devices/stateManager");
function extractBearerToken(req) {
    const raw = String(req.headers.authorization || '').trim();
    if (!raw.toLowerCase().startsWith('bearer ')) {
        return null;
    }
    return raw.slice(7).trim() || null;
}
function requireWebAuthnSession(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = extractBearerToken(req);
        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Session WebAuthn requise',
                code: 'WEBAUTHN_REQUIRED'
            });
            return;
        }
        const validation = yield stateManager_1.stateManager.validateAuthSession(token);
        if (!validation.valid) {
            res.status(401).json({
                success: false,
                message: 'Session WebAuthn invalide ou expiree',
                code: 'WEBAUTHN_INVALID'
            });
            return;
        }
        next();
    });
}
