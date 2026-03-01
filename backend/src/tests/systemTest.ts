import { stateManager } from "../devices/stateManager";
import logger from "../services/logger";

async function runTests() {
  logger.info("SYSTEM TESTS START");
  await stateManager.ready;

  let failed = false;
  const check = (condition: boolean, success: string, failure: string) => {
    if (condition) {
      logger.info(`PASS: ${success}`);
      return;
    }
    failed = true;
    logger.error(`FAIL: ${failure}`);
  };

  logger.info("Test 1: create device");
  const testDevice = {
    id: "test_light_1",
    type: "light",
    name: "Test Light",
    state: { power: "off" },
  };
  await stateManager.addDevice(testDevice);

  const devices = stateManager.getAllDevices();
  const created = devices.find((d) => d.id === "test_light_1");
  check(!!created, "device created", "device creation failed");

  logger.info("Test 2: create rule");
  const testRule = {
    id: "rule_test",
    name: "Test Rule",
    triggerDeviceId: "test_light_1",
    value: "on",
    actionDeviceId: "test_light_1",
    enabled: true,
  };
  await stateManager.addRule(testRule);

  const rules = stateManager.getRules();
  const ruleCreated = rules.find((r) => r.id === "rule_test");
  check(!!ruleCreated, "rule created", "rule creation failed");

  logger.info("Test 3: panic mode");
  await stateManager.triggerPanicMode();
  const logs = stateManager.getSystemLogs();
  check(
    logs.some((l: string) => l.includes("PANIQUE") || l.includes("PANIC")),
    "panic mode logged",
    "panic mode not logged"
  );

  logger.info("Test 4: system reset");
  await stateManager.resetSystem();
  const devicesAfterReset = stateManager.getAllDevices();
  check(
    devicesAfterReset.length === 0,
    "system reset removed all devices",
    `system reset failed (${devicesAfterReset.length} devices remaining)`
  );

  if (failed) {
    throw new Error("System tests failed");
  }

  logger.info("SYSTEM TESTS PASSED");
}

runTests().catch((error) => {
  logger.error("SYSTEM TESTS ERROR", error);
  process.exitCode = 1;
});
