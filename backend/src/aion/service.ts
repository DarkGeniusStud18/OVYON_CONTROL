import { stateManager } from '../devices/stateManager';
import logger from '../services/logger';
import { publishMqtt } from '../mqtt/broker';
import { processOfflineCommand } from './engine';
import { AionResult, CommandHistoryItem } from './types';
import { offlineCommandCatalog } from './localDict';

function mapHistory(rows: Awaited<ReturnType<typeof stateManager.getRecentCommandHistory>>): CommandHistoryItem[] {
  return rows.map((row) => ({
    text: row.text,
    normalizedText: row.normalized_text,
    matchedIntent: row.matched_intent,
    success: row.success === 1
  }));
}

export async function handleAionOfflineCommand(text: string): Promise<AionResult> {
  const historyRows = await stateManager.getRecentCommandHistory(80);
  const history = mapHistory(historyRows);

  const result = processOfflineCommand({ text, history });

  for (const action of result.actions) {
    try {
      await publishMqtt(action.topic, action.payload, action.qos ?? 1, action.retain ?? false);
    } catch (error) {
      logger.error('AION MQTT publish failed', { topic: action.topic, payload: action.payload, error });
    }
  }

  await stateManager.addCommandHistory({
    text,
    normalizedText: result.normalizedText,
    source: 'offline_dict',
    matchedIntent: result.intent ?? null,
    success: result.success,
    suggestions: result.suggestions.map((item) => item.text)
  });

  if (result.success) {
    await publishMqtt(
      'aion/transcript',
      JSON.stringify({
        text,
        response: result.response,
        status: 'success',
        level: result.level,
        language: result.language,
        intent: result.intent,
        timestamp: Date.now()
      }),
      1,
      false
    );
  }

  return result;
}

export function getOfflineCatalog(): string[] {
  return offlineCommandCatalog;
}
