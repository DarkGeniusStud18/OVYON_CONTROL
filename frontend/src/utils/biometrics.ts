/**
 * UTILITAIRE BIOMÉTRIQUE - OVYON SECURITY
 * Gère l'authentification forte via l'API WebAuthn (TouchID, FaceID, Windows Hello).
 */

export const isBiometricsAvailable = async (): Promise<boolean> => {
  if (typeof window === 'undefined' || !window.PublicKeyCredential) return false;
  try {
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch {
    return false;
  }
};

export const authenticateUser = async (): Promise<boolean> => {
  try {
    const isAvailable = await isBiometricsAvailable();
    
    // Si pas de capteur, on simule un succès pour ne pas bloquer la démo sur un PC sans capteur
    // EN PRODUCTION : On renverrait false ou on demanderait un code PIN
    if (!isAvailable) {
      console.warn("Biométrie non disponible : Bypass autorisé pour démo.");
      return true; 
    }

    // Création d'un challenge aléatoire
    const challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    // Demande d'authentification à l'OS
    // Note: En mode "platform", l'OS gère l'UI (FaceID popup, etc.)
    await navigator.credentials.get({
      publicKey: {
        challenge,
        rpId: window.location.hostname, // Doit correspondre au domaine (localhost marche)
        userVerification: "required",
        timeout: 60000,
      }
    });

    // Si on arrive ici sans erreur, c'est que l'utilisateur est vérifié
    return true;
  } catch (error) {
    console.error("Échec auth biométrique:", error);
    return false;
  }
};
