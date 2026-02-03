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
const stateManager_1 = require("../devices/stateManager");
const logger_1 = __importDefault(require("../services/logger"));
function runTests() {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info("🧪 DÉBUT DES TESTS SYSTÈME OVYON");
        // 1. Test Device Creation
        logger_1.default.info("Test 1: Création d'un appareil...");
        const testDevice = { id: 'test_light_1', type: 'light', name: 'Test Light', state: { power: 'off' } };
        yield stateManager_1.stateManager.addDevice(testDevice);
        const devices = stateManager_1.stateManager.getAllDevices();
        const created = devices.find(d => d.id === 'test_light_1');
        if (created)
            logger_1.default.info("✅ Appareil créé avec succès");
        else
            logger_1.default.error("❌ Échec création appareil");
        // 2. Test Rule Creation
        logger_1.default.info("Test 2: Création d'une règle...");
        const testRule = {
            id: 'rule_test',
            name: 'Test Rule',
            triggerDeviceId: 'test_light_1',
            value: 'on',
            actionDeviceId: 'test_light_1',
            enabled: true
        };
        yield stateManager_1.stateManager.addRule(testRule);
        const rules = stateManager_1.stateManager.getRules();
        const ruleCreated = rules.find(r => r.id === 'rule_test');
        if (ruleCreated)
            logger_1.default.info("✅ Règle créée avec succès");
        else
            logger_1.default.error("❌ Échec création règle");
        // 3. Test Panic Mode
        logger_1.default.info("Test 3: Mode Panique...");
        yield stateManager_1.stateManager.triggerPanicMode();
        const logs = stateManager_1.stateManager.getSystemLogs();
        if (logs.some(l => l.includes("PANIQUE")))
            logger_1.default.info("✅ Mode Panique loggué et exécuté");
        else
            logger_1.default.error("❌ Échec Mode Panique");
        // 4. Test Reset
        logger_1.default.info("Test 4: Réinitialisation Système...");
        yield stateManager_1.stateManager.resetSystem();
        const devicesAfterReset = stateManager_1.stateManager.getAllDevices();
        if (devicesAfterReset.length === 0)
            logger_1.default.info("✅ Système réinitialisé (0 appareils)");
        else
            logger_1.default.error(`❌ Échec Reset (${devicesAfterReset.length} appareils restants)`);
        logger_1.default.info("🎉 TOUS LES TESTS TERMINÉS");
    });
}
// Mocking DB for standalone run if needed, but here we run against real dev DB logic
runTests().catch(console.error);
