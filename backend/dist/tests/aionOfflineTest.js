"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const engine_1 = require("../aion/engine");
const localDict_1 = require("../aion/localDict");
function run() {
    (0, assert_1.strict)(localDict_1.offlineCommandCatalog.length >= 50, 'offline catalog must contain at least 50 commands');
    (0, assert_1.strict)(localDict_1.offlineCommandCatalog.length <= 80, 'offline catalog must stay under 80 commands');
    const fr = (0, engine_1.processOfflineCommand)({ text: 'allume la lumiere du salon', history: [] });
    assert_1.strict.equal(fr.success, true, 'FR command should match');
    assert_1.strict.ok(fr.actions.length > 0, 'FR command should produce actions');
    const fon = (0, engine_1.processOfflineCommand)({ text: 'pa gbogbo ina', history: [] });
    assert_1.strict.equal(fon.success, true, 'Fon command should match');
    const yor = (0, engine_1.processOfflineCommand)({ text: 'tan fitila ile', history: [] });
    assert_1.strict.equal(yor.success, true, 'Yoruba command should match');
    const en = (0, engine_1.processOfflineCommand)({ text: 'open main door', history: [] });
    assert_1.strict.equal(en.success, true, 'English command should match');
    assert_1.strict.equal(en.language, 'en', 'English command should be tagged as en');
    const fallback = (0, engine_1.processOfflineCommand)({
        text: 'etein toute le lumier du salon',
        history: [{
                text: 'eteins la lumiere du salon',
                normalizedText: 'eteins la lumiere du salon',
                matchedIntent: 'light_off_zone',
                success: true
            }]
    });
    assert_1.strict.equal(fallback.success, true, 'Fallback should recover typo command');
    assert_1.strict.ok(['fallback', 1].includes(fallback.level), 'Recovered command should be direct or fallback');
    console.log('AION offline tests passed');
}
run();
