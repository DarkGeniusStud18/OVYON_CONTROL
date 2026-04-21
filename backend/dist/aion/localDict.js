"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offlineCommandCatalog = exports.localPatterns = void 0;
const KNOWN_ZONES = ['salon', 'chambre', 'cuisine'];
function extractZone(text) {
    const match = KNOWN_ZONES.find((zone) => text.includes(zone));
    return match !== null && match !== void 0 ? match : 'salon';
}
function extractPlugId(text) {
    if (text.includes(' 2') || text.includes('deux') || text.includes('meji')) {
        return '2';
    }
    return '1';
}
function parsePercent(raw, defaultValue) {
    if (!raw) {
        return defaultValue;
    }
    const numeric = parseInt(raw, 10);
    if (Number.isNaN(numeric)) {
        return defaultValue;
    }
    return Math.max(0, Math.min(100, numeric));
}
function lightPowerAction(zone, power) {
    return { topic: `ovyon/control/lights/${zone}/power`, payload: power, qos: 1 };
}
function lightBrightnessAction(zone, brightness) {
    return { topic: `ovyon/control/lights/${zone}/brightness`, payload: String(brightness), qos: 1 };
}
function plugPowerAction(plugId, power) {
    return { topic: `ovyon/control/plugs/${plugId}/power`, payload: power, qos: 1 };
}
exports.localPatterns = [
    {
        intent: 'lights_off_all',
        pattern: /(?:eteins|eteindre|coupe|off|pa gbogbo ina|ku lampu bi|turn off all lights)/,
        examples: ['eteins toutes les lumieres', 'pa gbogbo ina', 'ku lampu bi'],
        response: 'Toutes les lumieres sont maintenant eteintes.',
        toActions: () => [{ topic: 'ovyon/control/all/power', payload: 'off', qos: 1 }]
    },
    {
        intent: 'lights_on_all',
        pattern: /(?:allume|active|on|tan gbogbo ina|tan ina gbogbo|turn on all lights)/,
        examples: ['allume toutes les lumieres', 'tan gbogbo ina', 'turn on all lights'],
        response: 'Toutes les lumieres sont allumees.',
        toActions: () => [
            lightPowerAction('salon', 'on'),
            lightPowerAction('chambre', 'on'),
            lightPowerAction('cuisine', 'on')
        ]
    },
    {
        intent: 'light_on_zone',
        pattern: /(?:allume|active|on|tan ina|tan fitila|turn on|switch on).*(?:salon|chambre|cuisine)?/,
        examples: ['allume salon', 'tan ina salon', 'turn on cuisine light'],
        response: 'Lumiere de la zone activee.',
        toActions: (text) => [lightPowerAction(extractZone(text), 'on')]
    },
    {
        intent: 'light_off_zone',
        pattern: /(?:eteins|coupe|off|pa ina|ku lampu|turn off|switch off).*(?:salon|chambre|cuisine)?/,
        examples: ['eteins chambre', 'pa ina cuisine', 'turn off salon light'],
        response: 'Lumiere de la zone coupee.',
        toActions: (text) => [lightPowerAction(extractZone(text), 'off')]
    },
    {
        intent: 'light_brightness_set',
        pattern: /(?:luminosite|brightness|intensite|didan|set brightness).*(\d{1,3})/,
        examples: ['luminosite salon 70', 'set brightness 40', 'didan 60'],
        response: 'Luminosite appliquee.',
        toActions: (text, match) => [lightBrightnessAction(extractZone(text), parsePercent(match[1], 100))]
    },
    {
        intent: 'light_brightness_max',
        pattern: /(?:maximum|max|a fond|100\s*%|full brightness)/,
        examples: ['lumieres a fond', 'brightness max', 'ina max'],
        response: 'Luminosite au maximum.',
        toActions: (text) => [lightBrightnessAction(extractZone(text), 100)]
    },
    {
        intent: 'light_brightness_min',
        pattern: /(?:minimum|min|faible|10\s*%|dim light)/,
        examples: ['lumieres au minimum', 'dim light in salon', 'ina kekere'],
        response: 'Luminosite reduite.',
        toActions: (text) => [lightBrightnessAction(extractZone(text), 10)]
    },
    {
        intent: 'door_open',
        pattern: /(?:ouvre|ouvrir|open|si ona|si ilekun|open door)/,
        examples: ['ouvre la porte', 'si ona', 'open main door'],
        response: 'Ouverture de la porte principale.',
        toActions: () => [{ topic: 'ovyon/control/door/main/action', payload: 'open', qos: 2 }]
    },
    {
        intent: 'door_close',
        pattern: /(?:ferme|fermer|close|ti ona|pa ilekun|close door)/,
        examples: ['ferme la porte', 'ti ona', 'close main door'],
        response: 'Fermeture de la porte principale.',
        toActions: () => [{ topic: 'ovyon/control/door/main/action', payload: 'close', qos: 2 }]
    },
    {
        intent: 'door_lock',
        pattern: /(?:verrouille|lock|secure door|lock main door)/,
        examples: ['verrouille la porte', 'lock door', 'secure the door'],
        response: 'Porte securisee.',
        toActions: () => [{ topic: 'ovyon/control/door/main/action', payload: 'close', qos: 2 }]
    },
    {
        intent: 'door_unlock',
        pattern: /(?:deverrouille|unlock|unsecure door|unlock main door)/,
        examples: ['deverrouille la porte', 'unlock door', 'open secure door'],
        response: 'Porte deverrouillee.',
        toActions: () => [{ topic: 'ovyon/control/door/main/action', payload: 'open', qos: 2 }]
    },
    {
        intent: 'window_open_full',
        pattern: /(?:ouvre|ouvrir|open|si ferese|open window).*(fenetre|window)/,
        examples: ['ouvre la fenetre', 'open window', 'si ferese salon'],
        response: 'Fenetre ouverte.',
        toActions: () => [{ topic: 'ovyon/control/window/salon/position', payload: '100', qos: 1 }]
    },
    {
        intent: 'window_close_full',
        pattern: /(?:ferme|fermer|close|ti ferese|close window).*(fenetre|window)/,
        examples: ['ferme la fenetre', 'close window', 'ti ferese'],
        response: 'Fenetre fermee.',
        toActions: () => [{ topic: 'ovyon/control/window/salon/position', payload: '0', qos: 1 }]
    },
    {
        intent: 'window_position_set',
        pattern: /(?:fenetre|window|ferese|set window).*(\d{1,3})/,
        examples: ['fenetre a 35', 'window 50 percent', 'ferese 20'],
        response: 'Position de fenetre mise a jour.',
        toActions: (_text, match) => [{ topic: 'ovyon/control/window/salon/position', payload: String(parsePercent(match[1], 50)), qos: 1 }]
    },
    {
        intent: 'plug_on_id',
        pattern: /(?:allume|active|on|tan|turn on|switch on).*(prise|plug).*(1|2|deux|meji)?/,
        examples: ['allume prise 1', 'turn on plug 2', 'tan plug meji'],
        response: 'Prise activee.',
        toActions: (text) => [plugPowerAction(extractPlugId(text), 'on')]
    },
    {
        intent: 'plug_off_id',
        pattern: /(?:eteins|coupe|off|pa|turn off|switch off).*(prise|plug).*(1|2|deux|meji)?/,
        examples: ['eteins prise 1', 'turn off plug 2', 'pa plug meji'],
        response: 'Prise coupee.',
        toActions: (text) => [plugPowerAction(extractPlugId(text), 'off')]
    },
    {
        intent: 'plug_all_off',
        pattern: /(?:coupe|eteins|off).*(prises|plugs|all plugs)/,
        examples: ['coupe toutes les prises', 'all plugs off', 'pa all plugs'],
        response: 'Toutes les prises sont coupees.',
        toActions: () => [plugPowerAction('1', 'off'), plugPowerAction('2', 'off')]
    },
    {
        intent: 'plug_all_on',
        pattern: /(?:active|allume|on).*(prises|plugs|all plugs)/,
        examples: ['allume toutes les prises', 'all plugs on', 'tan all plugs'],
        response: 'Toutes les prises sont actives.',
        toActions: () => [plugPowerAction('1', 'on'), plugPowerAction('2', 'on')]
    },
    {
        intent: 'status_general',
        pattern: /(?:etat maison|statut maison|status house|home status|house status|what is home status|bawo ni ile|ile status)/,
        examples: ['etat maison', 'status house', 'bawo ni ile'],
        response: 'Je peux donner le statut des lumieres, porte, fenetre et prises.',
        toActions: () => []
    },
    {
        intent: 'status_lights',
        pattern: /(?:etat lumiere|statut lumiere|light status|ina status)/,
        examples: ['etat lumiere salon', 'light status', 'ina status'],
        response: 'Je recupere le statut de l eclairage.',
        toActions: () => []
    },
    {
        intent: 'status_security',
        pattern: /(?:etat porte|status door|security status|ona status)/,
        examples: ['etat porte', 'door status', 'security status'],
        response: 'Je recupere le statut securite.',
        toActions: () => []
    },
    {
        intent: 'status_energy',
        pattern: /(?:conso|consommation|energie|power usage|ina lilo)/,
        examples: ['consommation prise', 'power usage', 'ina lilo'],
        response: 'Je recupere les informations energie.',
        toActions: () => []
    },
    {
        intent: 'panic_mode',
        pattern: /(?:mode panique|panic mode|urgence|emergency shutdown)/,
        examples: ['mode panique', 'panic mode', 'emergency shutdown'],
        response: 'Mode panique active. Systeme securise.',
        toActions: () => [
            { topic: 'ovyon/control/all/power', payload: 'off', qos: 1 },
            { topic: 'ovyon/control/door/main/action', payload: 'close', qos: 2 },
            { topic: 'ovyon/control/window/salon/position', payload: '0', qos: 1 }
        ]
    },
    {
        intent: 'scene_evening',
        pattern: /(?:scene soir|mode soir|night mode|ale mode)/,
        examples: ['mode soir', 'scene evening', 'night mode'],
        response: 'Scene soir activee.',
        toActions: () => [
            lightBrightnessAction('salon', 35),
            lightBrightnessAction('chambre', 20),
            plugPowerAction('1', 'off')
        ]
    },
    {
        intent: 'scene_day',
        pattern: /(?:mode jour|scene jour|day mode|osan mode)/,
        examples: ['mode jour', 'scene day', 'osan mode'],
        response: 'Scene jour activee.',
        toActions: () => [
            lightBrightnessAction('salon', 80),
            lightBrightnessAction('cuisine', 70),
            plugPowerAction('1', 'on')
        ]
    },
    {
        intent: 'scene_absence',
        pattern: /(?:mode absence|away mode|je pars|mo n lo)/,
        examples: ['mode absence', 'away mode', 'je pars'],
        response: 'Mode absence active.',
        toActions: () => [
            { topic: 'ovyon/control/all/power', payload: 'off', qos: 1 },
            { topic: 'ovyon/control/door/main/action', payload: 'close', qos: 2 }
        ]
    },
    {
        intent: 'help_commands',
        pattern: /(?:aide|help|quoi dire|commandes disponibles|what can you do|available commands|ran mi lowo)/,
        examples: ['aide', 'help', 'commandes disponibles'],
        response: 'Je peux controler lumieres, porte, fenetre, prises, scenes et statut.',
        toActions: () => []
    }
];
exports.offlineCommandCatalog = [
    'allume la lumiere du salon',
    'allume la lumiere de la chambre',
    'allume la lumiere de la cuisine',
    'eteins la lumiere du salon',
    'eteins la lumiere de la chambre',
    'eteins la lumiere de la cuisine',
    'allume toutes les lumieres',
    'eteins toutes les lumieres',
    'luminosite salon 20',
    'luminosite salon 40',
    'luminosite salon 60',
    'luminosite salon 80',
    'luminosite chambre 30',
    'luminosite chambre 50',
    'luminosite cuisine 70',
    'lumiere salon a fond',
    'lumiere salon minimum',
    'ouvre la porte principale',
    'ferme la porte principale',
    'verrouille la porte principale',
    'deverrouille la porte principale',
    'ouvre la fenetre du salon',
    'ferme la fenetre du salon',
    'fenetre salon 25',
    'fenetre salon 50',
    'fenetre salon 75',
    'allume prise 1',
    'eteins prise 1',
    'allume prise 2',
    'eteins prise 2',
    'allume toutes les prises',
    'eteins toutes les prises',
    'mode panique',
    'mode soir',
    'mode jour',
    'mode absence',
    'etat maison',
    'etat lumiere',
    'etat porte',
    'consommation energie',
    'tan ina salon',
    'tan ina chambre',
    'tan ina cuisine',
    'pa ina salon',
    'pa ina chambre',
    'pa ina cuisine',
    'tan gbogbo ina',
    'pa gbogbo ina',
    'si ona',
    'ti ona',
    'si ferese',
    'ti ferese',
    'ferese 30',
    'tan plug 1',
    'pa plug 1',
    'tan plug 2',
    'pa plug 2',
    'ku lampu bi',
    'ma lampu',
    'tan fitila ile',
    'pa fitila ile',
    'turn on salon light',
    'turn off salon light',
    'turn on all lights',
    'turn off all lights',
    'set living room brightness to 60',
    'set bedroom brightness to 40',
    'set kitchen brightness to 70',
    'open main door',
    'close main door',
    'lock main door',
    'unlock main door',
    'open window',
    'close window',
    'set window to 40',
    'turn on plug 1',
    'turn off plug 2',
    'panic mode',
    'home status',
    'help'
];
