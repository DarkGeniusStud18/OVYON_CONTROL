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
exports.handleAionOfflineCommand = handleAionOfflineCommand;
exports.getOfflineCatalog = getOfflineCatalog;
const stateManager_1 = require("../devices/stateManager");
const logger_1 = __importDefault(require("../services/logger"));
const broker_1 = require("../mqtt/broker");
const engine_1 = require("./engine");
const localDict_1 = require("./localDict");
function mapHistory(rows) {
    return rows.map((row) => ({
        text: row.text,
        normalizedText: row.normalized_text,
        matchedIntent: row.matched_intent,
        success: row.success === 1
    }));
}
function handleAionOfflineCommand(text) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const historyRows = yield stateManager_1.stateManager.getRecentCommandHistory(80);
        const history = mapHistory(historyRows);
        const result = (0, engine_1.processOfflineCommand)({ text, history });
        for (const action of result.actions) {
            try {
                yield (0, broker_1.publishMqtt)(action.topic, action.payload, (_a = action.qos) !== null && _a !== void 0 ? _a : 1, (_b = action.retain) !== null && _b !== void 0 ? _b : false);
            }
            catch (error) {
                logger_1.default.error('AION MQTT publish failed', { topic: action.topic, payload: action.payload, error });
            }
        }
        yield stateManager_1.stateManager.addCommandHistory({
            text,
            normalizedText: result.normalizedText,
            source: 'offline_dict',
            matchedIntent: (_c = result.intent) !== null && _c !== void 0 ? _c : null,
            success: result.success,
            suggestions: result.suggestions.map((item) => item.text)
        });
        if (result.success) {
            yield (0, broker_1.publishMqtt)('aion/transcript', JSON.stringify({
                text,
                response: result.response,
                status: 'success',
                level: result.level,
                language: result.language,
                intent: result.intent,
                timestamp: Date.now()
            }), 1, false);
        }
        return result;
    });
}
function getOfflineCatalog() {
    return localDict_1.offlineCommandCatalog;
}
