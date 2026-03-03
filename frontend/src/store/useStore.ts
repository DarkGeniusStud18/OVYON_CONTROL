import { create } from "zustand";
import mqtt from "mqtt";
import { toast } from "react-hot-toast";
import { feedback } from "../utils/feedback";
import { authenticateUser } from "../utils/biometrics";

const API_HOST =
  typeof window !== "undefined" ? window.location.hostname : "localhost";
const API_BASE = `http://${API_HOST}:3001/api`;

// ... (Interfaces DeviceState, VoiceCommand, AutomationRule, AppSettings, DiscoveredDevice inchangées)
interface DeviceState {
  id: string;
  type: "light" | "door" | "window" | "plug" | "sensor" | "other";
  name: string;
  online: boolean;
  state: any;
}

interface VoiceCommand {
  id: string;
  text: string;
  intent: string;
  timestamp: Date;
  status: "success" | "error" | "processing";
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
  biometricsEnabled: boolean;
  panicButtonEnabled: boolean;
  adminModeEnabled: boolean;
}

interface DiscoveredDevice {
  id: string;
  name: string;
  rssi: number;
  type: "light" | "plug" | "door" | "window";
}

interface ConfirmModalState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}

interface AppState {
  connected: boolean;
  devices: DeviceState[];
  voiceHistory: VoiceCommand[];
  automationRules: AutomationRule[];
  settings: AppSettings;
  mqttClient: mqtt.MqttClient | null;
  activeTab:
    | "home"
    | "voice"
    | "settings"
    | "vision"
    | "auto"
    | "analytics"
    | "splash"
    | "admin";
  isAppLoading: boolean;
  isPairing: boolean;
  pairingStatus: "idle" | "scanning" | "list" | "success";
  discoveredDevices: DiscoveredDevice[];
  isSmartAiEnabled: boolean;
  isAionResponding: boolean;
  adminLogs: string[];
  isPinModalOpen: boolean;

  // Modal State
  confirmModal: ConfirmModalState;

  // ACTIONS
  fetchData: () => Promise<void>;
  fetchAdminLogs: () => Promise<void>;
  setAppLoading: (loading: boolean) => void;
  setPairing: (pairing: boolean) => void;
  setPairingStatus: (status: "idle" | "scanning" | "list" | "success") => void;
  setDiscoveredDevices: (devices: DiscoveredDevice[]) => void;
  setActiveTab: (
    tab:
      | "home"
      | "voice"
      | "settings"
      | "vision"
      | "auto"
      | "analytics"
      | "splash"
      | "admin",
  ) => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  setPinModalOpen: (open: boolean) => void;
  setAdminMode: (enabled: boolean) => void;
  setSmartAi: (enabled: boolean) => void;
  resetSystem: () => void; // Changé pour utiliser la modale
  triggerPanic: () => Promise<void>;
  initMqtt: (forceReconnect?: boolean) => void;
  sendCommand: (topic: string, message: string) => Promise<void>;
  addVoiceCommand: (cmd: Omit<VoiceCommand, "id" | "timestamp">) => void;
  updateDevice: (id: string, newState: any) => void;
  toggleAutomation: (id: string) => void;
  addAutomation: (rule: Omit<AutomationRule, "id">) => void;
  updateAutomation: (id: string, rule: Partial<AutomationRule>) => void;
  deleteAutomation: (id: string) => void;
  addDevice: (device: DeviceState) => void;
  updateDeviceMeta: (id: string, name: string) => void;
  deleteDevice: (id: string) => void;

  // Modal Actions
  openConfirmModal: (
    title: string,
    message: string,
    onConfirm: () => void,
  ) => void;
  closeConfirmModal: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  connected: false,
  mqttClient: null,
  activeTab: "splash",
  isAppLoading: false,
  isPairing: false,
  pairingStatus: "idle",
  discoveredDevices: [],
  voiceHistory: [],
  adminLogs: [],
  isPinModalOpen: false,
  isSmartAiEnabled: true,
  isAionResponding: false,
  confirmModal: { isOpen: false, title: "", message: "", onConfirm: () => {} },
  settings: {
    brokerUrl: `${API_HOST}:8083`,
    mqttUser: "ovyon",
    notificationsEnabled: true,
    securityAlerts: true,
    biometricsEnabled: false,
    panicButtonEnabled: false,
    adminModeEnabled: localStorage.getItem("ovyon_admin_mode") === "true",
  },
  automationRules: [],
  devices: [],

  // ... (fetchData et fetchAdminLogs inchangés) ...
  fetchData: async () => {
    try {
      const [devRes, rulesRes] = await Promise.all([
        fetch(`${API_BASE}/devices`),
        fetch(`${API_BASE}/rules`),
      ]);
      const devices = await devRes.json();
      const automationRules = await rulesRes.json();
      set({ devices, automationRules });
    } catch (e) {}
  },

  fetchAdminLogs: async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/logs`);
      const logs = await res.json();
      set({ adminLogs: logs });
    } catch (e) {}
  },

  // Modal Actions
  openConfirmModal: (title, message, onConfirm) => {
    feedback.tap();
    set({ confirmModal: { isOpen: true, title, message, onConfirm } });
  },
  closeConfirmModal: () =>
    set((state) => ({
      confirmModal: { ...state.confirmModal, isOpen: false },
    })),

  setPinModalOpen: (open) => set({ isPinModalOpen: open }),

  setAdminMode: (enabled) => {
    localStorage.setItem("ovyon_admin_mode", String(enabled));
    set((state) => ({
      settings: { ...state.settings, adminModeEnabled: enabled },
    }));
    if (enabled) feedback.success();
    else feedback.tap();
  },

  setSmartAi: (enabled) => {
    feedback.toggle(enabled);
    set({ isSmartAiEnabled: enabled });
    toast.success(enabled ? "IA Smart Activée" : "Mode Manuel");
  },

  resetSystem: () => {
    get().openConfirmModal(
      "Réinitialisation Système",
      "Voulez-vous vraiment tout effacer ? Cette action est irréversible.",
      async () => {
        try {
          feedback.error();
          const res = await fetch(`${API_BASE}/system/reset`, {
            method: "POST",
          });
          if (res.ok) {
            set({ devices: [], automationRules: [] });
            toast.success("Système réinitialisé.");
            get().fetchData();
          }
        } catch (e) {
          toast.error("Erreur réinitialisation.");
        }
      },
    );
  },

  triggerPanic: async () => {
    feedback.error();
    set((state) => ({
      devices: state.devices.map((d) => ({
        ...d,
        state: { ...d.state, power: "off", state: "closed", position: 0 },
      })),
    }));
    try {
      await fetch(`${API_BASE}/system/panic`, { method: "POST" });
      toast.error("MODE PANIQUE ACTIVÉ !");
    } catch (e) {
      console.error(e);
    }
  },

  setActiveTab: (tab) => {
    feedback.tap();
    set({ activeTab: tab });
  },
  setAppLoading: (loading) => set({ isAppLoading: loading }),
  setPairing: (pairing) => {
    feedback.tap();
    set({
      isPairing: pairing,
      pairingStatus: pairing ? "scanning" : "idle",
      discoveredDevices: [],
    });
  },
  setPairingStatus: (status) => set({ pairingStatus: status }),
  setDiscoveredDevices: (devices) => set({ discoveredDevices: devices }),

  toggleAutomation: async (id) => {
    const rule = get().automationRules.find((r) => r.id === id);
    feedback.toggle(!rule?.enabled);
    set((state) => ({
      automationRules: state.automationRules.map((r) =>
        r.id === id ? { ...r, enabled: !r.enabled } : r,
      ),
    }));
    try {
      await fetch(`${API_BASE}/rules/${id}/toggle`, { method: "POST" });
    } catch (e) {}
  },

  addAutomation: async (rule) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newRule = { ...rule, id } as AutomationRule;
    set((state) => ({ automationRules: [...state.automationRules, newRule] }));
    try {
      await fetch(`${API_BASE}/rules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRule),
      });
      toast.success("Scénario ajouté !");
      feedback.success();
    } catch (e) {}
  },

  updateAutomation: async (id, rule) => {
    set((state) => ({
      automationRules: state.automationRules.map((r) =>
        r.id === id ? { ...r, ...rule } : r,
      ),
    }));
    try {
      await fetch(`${API_BASE}/rules/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rule),
      });
      toast.success("Scénario mis à jour");
      feedback.success();
    } catch (e) {}
  },

  deleteAutomation: (id) => {
    get().openConfirmModal(
      "Supprimer Scénario",
      "Êtes-vous sûr de vouloir supprimer cette règle ?",
      async () => {
        set((state) => ({
          automationRules: state.automationRules.filter((r) => r.id !== id),
        }));
        try {
          await fetch(`${API_BASE}/rules/${id}`, { method: "DELETE" });
          feedback.tap();
          toast.success("Règle supprimée");
        } catch (e) {
          toast.error("Erreur suppression");
        }
      },
    );
  },

  addDevice: async (device) => {
    set((state) => ({ devices: [...state.devices, device] }));
    try {
      await fetch(`${API_BASE}/devices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(device),
      });
      toast.success("Appareil ajouté !");
      feedback.success();
    } catch (e) {}
  },

  updateDeviceMeta: async (id, name) => {
    set((state) => ({
      devices: state.devices.map((d) => (d.id === id ? { ...d, name } : d)),
    }));
    try {
      await fetch(`${API_BASE}/devices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      toast.success("Nom mis à jour");
    } catch (e) {}
  },

  deleteDevice: (id) => {
    get().openConfirmModal(
      "Supprimer Appareil",
      "Voulez-vous retirer cet appareil de l'écosystème ?",
      async () => {
        set((state) => ({ devices: state.devices.filter((d) => d.id !== id) }));
        try {
          await fetch(`${API_BASE}/devices/${id}`, { method: "DELETE" });
          feedback.tap();
          toast.success("Appareil supprimé");
        } catch (e) {
          toast.error("Erreur suppression");
        }
      },
    );
  },

  updateSettings: (newSettings) => {
    feedback.tap();
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    }));
  },

  updateDevice: (id, newState) =>
    set((state) => ({
      devices: state.devices.map((d) =>
        d.id === id
          ? { ...d, state: { ...d.state, ...newState }, online: true }
          : d,
      ),
    })),

  addVoiceCommand: (cmd) =>
    set((state) => ({
      voiceHistory: [
        { ...cmd, id: Math.random().toString(), timestamp: new Date() },
        ...state.voiceHistory,
      ].slice(0, 10),
    })),

  // ... (initMqtt et sendCommand inchangés) ...
  initMqtt: (forceReconnect = false) => {
    const currentClient = get().mqttClient;
    if (currentClient && !forceReconnect) return;
    if (currentClient) {
      currentClient.end(true);
      set({ connected: false, mqttClient: null });
    }

    const client = mqtt.connect(`ws://${get().settings.brokerUrl}`, {
      clientId: "ovyon_web_" + Math.random().toString(16).substring(2, 8),
      username: "ovyon",
      password: "demo2024",
      reconnectPeriod: 5000,
      connectTimeout: 10000,
    });

    client.on("connect", () => {
      set({ connected: true, mqttClient: client });
      client.subscribe("ovyon/status/#");
      client.subscribe("aion/transcript");
      client.subscribe("aion/proactive");
      toast.success("Système OVYON Connecté 🟢");
      feedback.success();
      get().fetchData();
    });

    client.on("message", (topic, message) => {
      const payloadStr = message.toString();
      try {
        if (topic === "aion/transcript") {
          const data = JSON.parse(payloadStr);
          get().addVoiceCommand(data);
          set({ isAionResponding: true });
          feedback.notify();
          setTimeout(() => set({ isAionResponding: false }), 4000);
          return;
        }
        if (topic === "aion/proactive") {
          const data = JSON.parse(payloadStr);
          toast(data.text, { icon: "🧠", duration: 6000 });
          feedback.notify();
          return;
        }
        const payload = JSON.parse(payloadStr);
        const parts = topic.split("/");
        const id = `${parts[2].slice(0, -1)}_${parts[3]}`;
        get().updateDevice(id, payload);
      } catch (e) {}
    });

    client.on("error", () => {
      set({ connected: false });
      feedback.error();
    });

    client.on("close", () => set({ connected: false }));
  },

  sendCommand: async (topic, message) => {
    const { settings, mqttClient } = get();

    if (
      topic.includes("door") &&
      message === "open" &&
      settings.biometricsEnabled
    ) {
      const promise = authenticateUser();
      toast.promise(promise, {
        loading: "Vérification biométrique...",
        success: "Identité confirmée",
        error: "Échec authentification",
      });

      const isAuthenticated = await promise;
      if (!isAuthenticated) {
        feedback.error();
        return;
      }
    }

    const parts = topic.split("/");
    const type = parts[2];
    const id = parts[3];
    const action = parts[4];

    if (type === "all" && action === "power") {
      set((state) => ({
        devices: state.devices.map((d) => ({
          ...d,
          state: { ...d.state, power: message },
        })),
      }));
      feedback.toggle(message === "on");
    } else {
      const mappedId = `${type.slice(0, -1)}_${id}`;
      if (action === "power") {
        get().updateDevice(mappedId, { power: message });
        feedback.toggle(message === "on");
      } else if (action === "action") {
        get().updateDevice(mappedId, {
          state: message === "open" ? "open" : "closed",
          position: message === "open" ? 100 : 0,
        });
        feedback.toggle(message === "open");
      } else if (action === "brightness") {
        get().updateDevice(mappedId, {
          brightness: parseInt(message),
          power: parseInt(message) > 0 ? "on" : "off",
        });
      } else if (action === "position") {
        get().updateDevice(mappedId, { position: parseInt(message) });
      }
    }

    if (mqttClient?.connected) {
      mqttClient.publish(topic, message);
    }
  },
}));
