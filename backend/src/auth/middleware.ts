import { NextFunction, Request, Response } from 'express';
import { stateManager } from '../devices/stateManager';

function extractBearerToken(req: Request): string | null {
  const raw = String(req.headers.authorization || '').trim();
  if (!raw.toLowerCase().startsWith('bearer ')) {
    return null;
  }
  return raw.slice(7).trim() || null;
}

export async function requireWebAuthnSession(req: Request, res: Response, next: NextFunction) {
  const token = extractBearerToken(req);
  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Session WebAuthn requise',
      code: 'WEBAUTHN_REQUIRED'
    });
    return;
  }

  const validation = await stateManager.validateAuthSession(token);
  if (!validation.valid) {
    res.status(401).json({
      success: false,
      message: 'Session WebAuthn invalide ou expiree',
      code: 'WEBAUTHN_INVALID'
    });
    return;
  }

  next();
}
