const API_BASE = import.meta.env.VITE_API_URL || "https://ovyon-control.onrender.com/api";

const DEFAULT_AUTH_USER = "owner";
const AUTH_TOKEN_KEY = "ovyon_auth_token";
let inFlightAuth: Promise<boolean> | null = null;

interface RegisterBeginResponse {
  success: boolean;
  options: PublicKeyCredentialCreationOptionsJSON;
}

interface LoginBeginResponse {
  success: boolean;
  options: PublicKeyCredentialRequestOptionsJSON;
}

interface AuthStatusResponse {
  success: boolean;
  registered: boolean;
  credentials: number;
}

interface PublicKeyCredentialCreationOptionsJSON {
  challenge: string;
  rp: { id: string; name: string };
  user: { id: string; name: string; displayName: string };
  pubKeyCredParams: Array<{ type: PublicKeyCredentialType; alg: number }>;
  timeout?: number;
  attestation?: AttestationConveyancePreference;
  authenticatorSelection?: AuthenticatorSelectionCriteria;
  excludeCredentials?: Array<{ type: PublicKeyCredentialType; id: string }>;
}

interface PublicKeyCredentialRequestOptionsJSON {
  challenge: string;
  timeout?: number;
  rpId?: string;
  userVerification?: UserVerificationRequirement;
  allowCredentials?: Array<{ type: PublicKeyCredentialType; id: string }>;
}

type SerializableCredential = {
  id: string;
  type: PublicKeyCredentialType;
  rawId: string;
  response: Record<string, unknown>;
};

function getAuthUsername(): string {
  if (typeof window === "undefined") {
    return DEFAULT_AUTH_USER;
  }
  const saved = window.localStorage.getItem("ovyon_auth_user");
  return (saved || DEFAULT_AUTH_USER).trim().toLowerCase();
}

function toArrayBuffer(base64url: string): ArrayBuffer {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = window.atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

function fromArrayBuffer(value: ArrayBuffer): string {
  const bytes = new Uint8Array(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return window
    .btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function mapCreationOptions(options: PublicKeyCredentialCreationOptionsJSON): PublicKeyCredentialCreationOptions {
  return {
    ...options,
    challenge: toArrayBuffer(options.challenge),
    user: {
      ...options.user,
      id: toArrayBuffer(options.user.id)
    },
    excludeCredentials: options.excludeCredentials?.map((credential) => ({
      ...credential,
      id: toArrayBuffer(credential.id)
    }))
  };
}

function mapRequestOptions(options: PublicKeyCredentialRequestOptionsJSON): PublicKeyCredentialRequestOptions {
  return {
    ...options,
    challenge: toArrayBuffer(options.challenge),
    allowCredentials: options.allowCredentials?.map((credential) => ({
      ...credential,
      id: toArrayBuffer(credential.id)
    }))
  };
}

function serializeCredential(credential: PublicKeyCredential): SerializableCredential {
  const base: SerializableCredential = {
    id: credential.id,
    type: "public-key",
    rawId: fromArrayBuffer(credential.rawId),
    response: {}
  };

  if (credential.response instanceof AuthenticatorAttestationResponse) {
    const attestationResponse = credential.response;
    const publicKey = attestationResponse.getPublicKey?.();
    base.response = {
      attestationObject: fromArrayBuffer(attestationResponse.attestationObject),
      clientDataJSON: fromArrayBuffer(attestationResponse.clientDataJSON),
      publicKey: publicKey ? fromArrayBuffer(publicKey) : null,
      publicKeyAlgorithm: attestationResponse.getPublicKeyAlgorithm?.() ?? -7,
      transports: attestationResponse.getTransports?.() ?? []
    };
    return base;
  }

  if (credential.response instanceof AuthenticatorAssertionResponse) {
    const assertionResponse = credential.response;
    base.response = {
      authenticatorData: fromArrayBuffer(assertionResponse.authenticatorData),
      clientDataJSON: fromArrayBuffer(assertionResponse.clientDataJSON),
      signature: fromArrayBuffer(assertionResponse.signature),
      userHandle: assertionResponse.userHandle
        ? fromArrayBuffer(assertionResponse.userHandle)
        : null
    };
    return base;
  }

  throw new Error("Type de credential non supporte");
}

async function registerCredential(username: string): Promise<boolean> {
  const beginResponse = await fetch(`${API_BASE}/auth/register/begin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, displayName: username })
  });
  if (!beginResponse.ok) {
    const body = await beginResponse.text().catch(() => "");
    console.error("register/begin failed", beginResponse.status, body);
    return false;
  }

  const beginData = (await beginResponse.json()) as RegisterBeginResponse;
  const credential = (await navigator.credentials.create({
    publicKey: mapCreationOptions(beginData.options)
  })) as PublicKeyCredential | null;

  if (!credential) return false;

  const finishResponse = await fetch(`${API_BASE}/auth/register/finish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      credential: serializeCredential(credential)
    })
  });

  if (!finishResponse.ok) {
    const body = await finishResponse.text().catch(() => "");
    console.error("register/finish failed", finishResponse.status, body);
    return false;
  }
  const finishData = (await finishResponse.json()) as { success?: boolean };
  return Boolean(finishData.success);
}

async function performLogin(username: string): Promise<boolean> {
  const beginResponse = await fetch(`${API_BASE}/auth/login/begin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username })
  });
  if (!beginResponse.ok) {
    const body = await beginResponse.text().catch(() => "");
    console.error("login/begin failed", beginResponse.status, body);
    return false;
  }

  const beginData = (await beginResponse.json()) as LoginBeginResponse;
  const credential = (await navigator.credentials.get({
    publicKey: mapRequestOptions(beginData.options)
  })) as PublicKeyCredential | null;

  if (!credential) return false;

  const finishResponse = await fetch(`${API_BASE}/auth/login/finish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      credential: serializeCredential(credential)
    })
  });
  if (!finishResponse.ok) {
    const body = await finishResponse.text().catch(() => "");
    console.error("login/finish failed", finishResponse.status, body);
    return false;
  }

  const finishData = (await finishResponse.json()) as {
    success?: boolean;
    verified?: boolean;
    sessionToken?: string;
  };
  const ok = Boolean(finishData.success && finishData.verified && finishData.sessionToken);
  if (ok && typeof window !== "undefined") {
    window.localStorage.setItem(AUTH_TOKEN_KEY, String(finishData.sessionToken));
  }
  return ok;
}

export const isBiometricsAvailable = async (): Promise<boolean> => {
  if (typeof window === "undefined" || !window.PublicKeyCredential) return false;
  try {
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch {
    return false;
  }
};

export const authenticateUser = async (): Promise<boolean> => {
  if (inFlightAuth) {
    return inFlightAuth;
  }

  inFlightAuth = (async () => {
  try {
    const available = await isBiometricsAvailable();
    if (!available) {
      return false;
    }

    const username = getAuthUsername();
    const statusResponse = await fetch(`${API_BASE}/auth/status/${encodeURIComponent(username)}`);
    if (!statusResponse.ok) {
      return false;
    }
    const statusData = (await statusResponse.json()) as AuthStatusResponse;

    if (!statusData.registered) {
      const registered = await registerCredential(username);
      if (!registered) return false;
    }

    return await performLogin(username);
  } catch (error) {
    console.error("WebAuthn authentication failed:", error);
    return false;
  } finally {
    inFlightAuth = null;
  }
  })();

  return inFlightAuth;
};

export const getWebAuthnSessionToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
};
