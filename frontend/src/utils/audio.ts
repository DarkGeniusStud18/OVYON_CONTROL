/**
 * AUDIO ENGINE - OVYON PREMIUM
 * Generates high-quality synthesized UI sounds using Web Audio API.
 * No external assets needed.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  private playTone(freq: number, type: OscillatorType, duration: number, volume: number) {
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  public playToggle(on: boolean) {
    this.playTone(on ? 880 : 440, 'sine', 0.1, 0.1);
  }

  public playSuccess() {
    this.playTone(660, 'sine', 0.1, 0.1);
    setTimeout(() => this.playTone(880, 'sine', 0.1, 0.1), 50);
  }

  public playNotification() {
    this.playTone(523.25, 'sine', 0.15, 0.1);
  }
}

export const audio = new AudioEngine();
