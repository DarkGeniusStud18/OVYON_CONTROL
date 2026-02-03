import { stateManager } from '../devices/stateManager';
import logger from '../services/logger';

async function runTests() {
    logger.info("🧪 DÉBUT DES TESTS SYSTÈME OVYON");

    // 1. Test Device Creation
    logger.info("Test 1: Création d'un appareil...");
    const testDevice = { id: 'test_light_1', type: 'light', name: 'Test Light', state: { power: 'off' } };
    await stateManager.addDevice(testDevice);
    
    const devices = stateManager.getAllDevices();
    const created = devices.find(d => d.id === 'test_light_1');
    if (created) logger.info("✅ Appareil créé avec succès");
    else logger.error("❌ Échec création appareil");

    // 2. Test Rule Creation
    logger.info("Test 2: Création d'une règle...");
    const testRule = { 
        id: 'rule_test', 
        name: 'Test Rule', 
        triggerDeviceId: 'test_light_1', 
        value: 'on', 
        actionDeviceId: 'test_light_1', 
        enabled: true 
    };
    await stateManager.addRule(testRule);
    
    const rules = stateManager.getRules();
    const ruleCreated = rules.find(r => r.id === 'rule_test');
    if (ruleCreated) logger.info("✅ Règle créée avec succès");
    else logger.error("❌ Échec création règle");

    // 3. Test Panic Mode
    logger.info("Test 3: Mode Panique...");
    await stateManager.triggerPanicMode();
    const logs = stateManager.getSystemLogs();
    if (logs.some(l => l.includes("PANIQUE"))) logger.info("✅ Mode Panique loggué et exécuté");
    else logger.error("❌ Échec Mode Panique");

    // 4. Test Reset
    logger.info("Test 4: Réinitialisation Système...");
    await stateManager.resetSystem();
    const devicesAfterReset = stateManager.getAllDevices();
    if (devicesAfterReset.length === 0) logger.info("✅ Système réinitialisé (0 appareils)");
    else logger.error(`❌ Échec Reset (${devicesAfterReset.length} appareils restants)`);

    logger.info("🎉 TOUS LES TESTS TERMINÉS");
}

// Mocking DB for standalone run if needed, but here we run against real dev DB logic
runTests().catch(console.error);
