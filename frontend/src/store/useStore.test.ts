import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useStore } from './useStore';

// Simulation de l'environnement navigateur
global.fetch = vi.fn();
global.confirm = vi.fn(() => true);

describe('OVYON Security Store Tests', () => {
  
  beforeEach(() => {
    // Reset du store avant chaque test
    useStore.setState({
      settings: {
        brokerUrl: 'test',
        mqttUser: 'test',
        notificationsEnabled: true,
        securityAlerts: true,
        biometricsEnabled: false,
        panicButtonEnabled: false,
        adminModeEnabled: false // Ajouté pour corriger l'erreur de type
      },
      devices: []
    });
  });

  it('devrait activer le mode biométrique', () => {
    const { updateSettings } = useStore.getState();
    
    updateSettings({ biometricsEnabled: true });
    
    const settings = useStore.getState().settings;
    expect(settings.biometricsEnabled).toBe(true);
  });

  it('devrait activer le bouton panique', () => {
    const { updateSettings } = useStore.getState();
    
    updateSettings({ panicButtonEnabled: true });
    
    expect(useStore.getState().settings.panicButtonEnabled).toBe(true);
  });

  it('devrait vider les appareils lors du reset system', async () => {
    // Setup initial state
    useStore.setState({ 
        devices: [{ id: 'test', type: 'light', name: 'Test', online: true, state: {} }] 
    });

    const { resetSystem } = useStore.getState();
    
    // Mock API success response
    (global.fetch as any).mockResolvedValue({ ok: true });

    await resetSystem();
    
    expect(useStore.getState().devices).toHaveLength(0);
  });
});