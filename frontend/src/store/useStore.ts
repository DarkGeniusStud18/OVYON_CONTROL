import { create } from 'zustand';
import mqtt from 'mqtt';
import { toast } from 'react-hot-toast';
import { feedback } from '../utils/feedback';

/**
 * SOURCE DE VÉRITÉ (ZUSTAND STORE)
 * Ce fichier centralise TOUT l'état de l'application.
 */

const API_BASE = 'http://localhost:3001/api';

interface DeviceState {
  id: string;
  type: 'light' | 'door' | 'window' | 'plug' | 'sensor' | 'other';
  name: string;
  online: boolean;
  state: any;
}

interface VoiceCommand {
  id: string;
  text: string;
  intent: string;
  timestamp: Date;
  status: 'success' | 'error' | 'processing';
  response?: string;
}

interface AutomationRule {
  id: string;
  name: string;
  triggerDeviceId: string;
  value: any;
  actionDeviceId: string;
  enabled: boolean;
}

interface AppSettings {
  brokerUrl: string;
  mqttUser: string;
  notificationsEnabled: boolean;
  securityAlerts: boolean;
}

interface DiscoveredDevice {
  id: string;
  name: string;
  rssi: number;
  type: 'light' | 'plug' | 'door' | 'window';
}

interface AppState {
  connected: boolean;
  devices: DeviceState[];
  voiceHistory: VoiceCommand[];
  automationRules: AutomationRule[];
  settings: AppSettings;
  mqttClient: mqtt.MqttClient | null;
  activeTab: 'home' | 'voice' | 'settings' | 'vision' | 'auto' | 'analytics' | 'splash';
  isAppLoading: boolean;
  isPairing: boolean;
  pairingStatus: 'idle' | 'scanning' | 'list' | 'success';
  discoveredDevices: DiscoveredDevice[];
  isSmartAiEnabled: boolean;
  isAionResponding: boolean;
  
  // ACTIONS
  fetchData: () => Promise<void>;
  setAppLoading: (loading: boolean) => void;
  setPairing: (pairing: boolean) => void;
  setPairingStatus: (status: 'idle' | 'scanning' | 'list' | 'success') => void;
  setDiscoveredDevices: (devices: DiscoveredDevice[]) => void;
  setActiveTab: (tab: 'home' | 'voice' | 'settings' | 'vision' | 'auto' | 'analytics' | 'splash') => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  setSmartAi: (enabled: boolean) => void;
  resetSystem: () => Promise<void>;
  initMqtt: (forceReconnect?: boolean) => void; 
  sendCommand: (topic: string, message: string) => void;
  addVoiceCommand: (cmd: Omit<VoiceCommand, 'id' | 'timestamp'>) => void;
  updateDevice: (id: string, newState: any) => void;
  
  toggleAutomation: (id: string) => void;
  addAutomation: (rule: Omit<AutomationRule, 'id'>) => void;
  updateAutomation: (id: string, rule: Partial<AutomationRule>) => void;
  deleteAutomation: (id: string) => void;

  addDevice: (device: DeviceState) => void;
  updateDeviceMeta: (id: string, name: string) => void;
  deleteDevice: (id: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
  connected: false,
  mqttClient: null,
  activeTab: 'splash',
  isAppLoading: false,
  isPairing: false,
  pairingStatus: 'idle',
  discoveredDevices: [],
  voiceHistory: [],
  isSmartAiEnabled: true,
  isAionResponding: false,
  settings: {
    brokerUrl: 'localhost:8083',
    mqttUser: 'ovyon',
    notificationsEnabled: true,
    securityAlerts: true
  },
  automationRules: [],
  devices: [],

  fetchData: async () => {
    try {
      const [devRes, rulesRes] = await Promise.all([
        fetch(`${API_BASE}/devices`),
        fetch(`${API_BASE}/rules`)
      ]);
      const devices = await devRes.json();
      const automationRules = await rulesRes.json();
      set({ devices, automationRules });
    } catch (e) {}
  },

  setSmartAi: (enabled) => {
    feedback.toggle(enabled);
    set({ isSmartAiEnabled: enabled });
    toast.success(enabled ? "IA Smart Activée" : "Mode Manuel");
  },

  resetSystem: async () => {
    if (!confirm("Voulez-vous vraiment réinitialiser TOUT le système ?")) return;
    try {
      feedback.error();
      const res = await fetch(`${API_BASE}/system/reset`, { method: 'POST' });
      if (res.ok) {
        set({ devices: [], automationRules: [] });
        toast.success("Système réinitialisé.");
        get().fetchData();
      }
    } catch (e) { toast.error("Erreur réinitialisation."); }
  },

  setActiveTab: (tab) => {
    feedback.tap();
    set({ activeTab: tab });
  },
  setAppLoading: (loading) => set({ isAppLoading: loading }),
  setPairing: (pairing) => {
    feedback.tap();
    set({ isPairing: pairing, pairingStatus: pairing ? 'scanning' : 'idle', discoveredDevices: [] });
  },
  setPairingStatus: (status) => set({ pairingStatus: status }),
  setDiscoveredDevices: (devices) => set({ discoveredDevices: devices }),

  toggleAutomation: async (id) => {
    const rule = get().automationRules.find(r => r.id === id);
    feedback.toggle(!rule?.enabled);
    set((state) => ({ automationRules: state.automationRules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r) }));
    try { await fetch(`${API_BASE}/rules/${id}/toggle`, { method: 'POST' }); } catch (e) {}
  },

  addAutomation: async (rule) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newRule = { ...rule, id } as AutomationRule;
    set((state) => ({ automationRules: [...state.automationRules, newRule] }));
    try {
      await fetch(`${API_BASE}/rules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRule)
      });
      toast.success("Scénario ajouté !");
      feedback.success();
    } catch (e) {}
  },

  updateAutomation: async (id, rule) => {
    set((state) => ({ automationRules: state.automationRules.map(r => r.id === id ? { ...r, ...rule } : r) }));
    try {
      await fetch(`${API_BASE}/rules/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rule)
      });
      toast.success("Scénario mis à jour");
      feedback.success();
    } catch (e) {}
  },

  deleteAutomation: async (id) => {
    if (!confirm("Supprimer ce scénario ?")) return;
    set((state) => ({ automationRules: state.automationRules.filter(r => r.id !== id) }));
    try {
      await fetch(`${API_BASE}/rules/${id}`, { method: 'DELETE' });
      feedback.tap();
    } catch (e) {}
  },

  addDevice: async (device) => {
    set((state) => ({ devices: [...state.devices, device] }));
    try {
      await fetch(`${API_BASE}/devices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(device)
      });
      toast.success("Appareil ajouté !");
      feedback.success();
    } catch (e) {}
  },

  updateDeviceMeta: async (id, name) => {
    set((state) => ({ devices: state.devices.map(d => d.id === id ? { ...d, name } : d) }));
    try {
      await fetch(`${API_BASE}/devices/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      toast.success("Nom mis à jour");
    } catch (e) {}
  },

  deleteDevice: async (id) => {
    if (!confirm("Supprimer cet appareil ?")) return;
    set((state) => ({ devices: state.devices.filter(d => d.id !== id) }));
    try {
      await fetch(`${API_BASE}/devices/${id}`, { method: 'DELETE' });
      feedback.tap();
    } catch (e) {}
  },

  updateSettings: (newSettings) => {
    feedback.tap();
    set((state) => ({
      settings: { ...state.settings, ...newSettings }
    }));
  },

  updateDevice: (id, newState) => set((state) => ({
    devices: state.devices.map((d) => 
      d.id === id ? { ...d, state: { ...d.state, ...newState }, online: true } : d
    )
  })),

  addVoiceCommand: (cmd) => set((state) => ({
    voiceHistory: [{ ...cmd, id: Math.random().toString(), timestamp: new Date() }, ...state.voiceHistory].slice(0, 10)
  })),

  initMqtt: (forceReconnect = false) => {
    const currentClient = get().mqttClient;
    if (currentClient && !forceReconnect) return;
    if (currentClient) {
      currentClient.end(true);
      set({ connected: false, mqttClient: null });
    }

    const client = mqtt.connect(`ws://${get().settings.brokerUrl}`, {
      clientId: 'ovyon_web_' + Math.random().toString(16).substring(2, 8),
      username: 'ovyon',
      password: 'demo2024',
      reconnectPeriod: 5000,
      connectTimeout: 10000,
    });

    client.on('connect', () => {
      set({ connected: true, mqttClient: client });
      client.subscribe('ovyon/status/#');
      client.subscribe('aion/transcript');
      client.subscribe('aion/proactive');
      toast.success('Système OVYON Connecté 🟢');
      feedback.success();
      get().fetchData();
    });

    client.on('message', (topic, message) => {
      const payloadStr = message.toString();
      try {
        if (topic === 'aion/transcript') {
          const data = JSON.parse(payloadStr);
          get().addVoiceCommand(data);
          set({ isAionResponding: true });
          feedback.notify();
          setTimeout(() => set({ isAionResponding: false }), 4000);
          return;
        }
        if (topic === 'aion/proactive') {
          const data = JSON.parse(payloadStr);
          toast(data.text, { icon: '🧠', duration: 6000 });
          feedback.notify();
          return;
        }
        const payload = JSON.parse(payloadStr);
        const parts = topic.split('/');
        const id = `${parts[2].slice(0, -1)}_${parts[3]}`; 
        get().updateDevice(id, payload);
      } catch (e) {}
    });

    client.on('error', () => {
      set({ connected: false });
      feedback.error();
    });

    client.on('close', () => set({ connected: false }));
  },

  sendCommand: (topic, message) => {
    const client = get().mqttClient;
    const parts = topic.split('/');
    const type = parts[2];
    const id = parts[3];
    const action = parts[4];

    if (type === 'all' && action === 'power') {
      set((state) => ({
        devices: state.devices.map(d => ({ ...d, state: { ...d.state, power: message } }))
      }));
      feedback.toggle(message === 'on');
    } else {
      const mappedId = `${type.slice(0, -1)}_${id}`;
      if (action === 'power') {
        get().updateDevice(mappedId, { power: message });
        feedback.toggle(message === 'on');
      } else if (action === 'action') {
        get().updateDevice(mappedId, { state: message === 'open' ? 'open' : 'closed', position: message === 'open' ? 100 : 0 });
        feedback.toggle(message === 'open');
      } else if (action === 'brightness') {
        get().updateDevice(mappedId, { brightness: parseInt(message), power: parseInt(message) > 0 ? 'on' : 'off' });
      } else if (action === 'position') {
        get().updateDevice(mappedId, { position: parseInt(message) });
      }
    }

    if (client?.connected) {
      client.publish(topic, message);
    }
  },
}));