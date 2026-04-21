import { strict as assert } from 'assert';
import { processOfflineCommand } from '../aion/engine';
import { offlineCommandCatalog } from '../aion/localDict';

function run() {
  assert(offlineCommandCatalog.length >= 50, 'offline catalog must contain at least 50 commands');
  assert(offlineCommandCatalog.length <= 80, 'offline catalog must stay under 80 commands');

  const fr = processOfflineCommand({ text: 'allume la lumiere du salon', history: [] });
  assert.equal(fr.success, true, 'FR command should match');
  assert.ok(fr.actions.length > 0, 'FR command should produce actions');

  const fon = processOfflineCommand({ text: 'pa gbogbo ina', history: [] });
  assert.equal(fon.success, true, 'Fon command should match');

  const yor = processOfflineCommand({ text: 'open main door', history: [] });
  assert.equal(yor.success, true, 'Yor/EN style command should match');

  const fallback = processOfflineCommand({
    text: 'etein toute le lumier du salon',
    history: [{
      text: 'eteins la lumiere du salon',
      normalizedText: 'eteins la lumiere du salon',
      matchedIntent: 'light_off_zone',
      success: true
    }]
  });

  assert.equal(fallback.success, true, 'Fallback should recover typo command');
  assert.ok(['fallback', 1].includes(fallback.level), 'Recovered command should be direct or fallback');

  console.log('AION offline tests passed');
}

run();
