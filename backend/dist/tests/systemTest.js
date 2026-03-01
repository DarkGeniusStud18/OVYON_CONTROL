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
        logger_1.default.info("SYSTEM TESTS START");
        yield stateManager_1.stateManager.ready;
        let failed = false;
        const check = (condition, success, failure) => {
            if (condition) {
                logger_1.default.info(`PASS: ${success}`);
                return;
            }
            failed = true;
            logger_1.default.error(`FAIL: ${failure}`);
        };
        logger_1.default.info("Test 1: create device");
        const testDevice = {
            id: "test_light_1",
            type: "light",
            name: "Test Light",
            state: { power: "off" },
        };
        yield stateManager_1.stateManager.addDevice(testDevice);
        const devices = stateManager_1.stateManager.getAllDevices();
        const created = devices.find((d) => d.id === "test_light_1");
        check(!!created, "device created", "device creation failed");
        logger_1.default.info("Test 2: create rule");
        const testRule = {
            id: "rule_test",
            name: "Test Rule",
            triggerDeviceId: "test_light_1",
            value: "on",
            actionDeviceId: "test_light_1",
            enabled: true,
        };
        yield stateManager_1.stateManager.addRule(testRule);
        const rules = stateManager_1.stateManager.getRules();
        const ruleCreated = rules.find((r) => r.id === "rule_test");
        check(!!ruleCreated, "rule created", "rule creation failed");
        logger_1.default.info("Test 3: panic mode");
        yield stateManager_1.stateManager.triggerPanicMode();
        const logs = stateManager_1.stateManager.getSystemLogs();
        check(logs.some((l) => l.includes("PANIQUE") || l.includes("PANIC")), "panic mode logged", "panic mode not logged");
        logger_1.default.info("Test 4: system reset");
        yield stateManager_1.stateManager.resetSystem();
        const devicesAfterReset = stateManager_1.stateManager.getAllDevices();
        check(devicesAfterReset.length === 0, "system reset removed all devices", `system reset failed (${devicesAfterReset.length} devices remaining)`);
        if (failed) {
            throw new Error("System tests failed");
        }
        logger_1.default.info("SYSTEM TESTS PASSED");
    });
}
runTests().catch((error) => {
    logger_1.default.error("SYSTEM TESTS ERROR", error);
    process.exitCode = 1;
});
