import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../utils/feedback", () => ({
  feedback: {
    tap: vi.fn(),
    toggle: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    notify: vi.fn(),
  },
}));

vi.stubGlobal("fetch", vi.fn());
vi.stubGlobal("confirm", vi.fn(() => true));
vi.stubGlobal("localStorage", {
  getItem: vi.fn(() => "false"),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  length: 0,
});

const { useStore } = await import("./useStore");

describe("OVYON Security Store Tests", () => {
  beforeEach(() => {
    useStore.setState({
      settings: {
        brokerUrl: "test",
        mqttUser: "test",
        notificationsEnabled: true,
        securityAlerts: true,
        biometricsEnabled: false,
        panicButtonEnabled: false,
        adminModeEnabled: false,
      },
      devices: [],
    });
  });

  it("enables biometrics mode", () => {
    const { updateSettings } = useStore.getState();
    updateSettings({ biometricsEnabled: true });
    expect(useStore.getState().settings.biometricsEnabled).toBe(true);
  });

  it("enables panic button", () => {
    const { updateSettings } = useStore.getState();
    updateSettings({ panicButtonEnabled: true });
    expect(useStore.getState().settings.panicButtonEnabled).toBe(true);
  });

  it("clears devices on reset", async () => {
    useStore.setState({
      devices: [{ id: "test", type: "light", name: "Test", online: true, state: {} }],
    });

    const { resetSystem } = useStore.getState();
    (global.fetch as any).mockResolvedValue({ ok: true });

    resetSystem();
    useStore.getState().confirmModal.onConfirm();
    await Promise.resolve();

    expect(useStore.getState().devices).toHaveLength(0);
  });
});
