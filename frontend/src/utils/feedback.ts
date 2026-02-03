/**
 * PREMIUM FEEDBACK ENGINE
 * Handles Haptics (Vibration) and Audio Synthesis
 */

class FeedbackEngine {
  private ctx: AudioContext | null = null;

  private initAudio() {
    if (!this.ctx) this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  private playTone(freq: number, type: OscillatorType, duration: number, volume: number) {
    this.initAudio();
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

  private vibrate(pattern: number | number[]) {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }

  public tap() {
    this.playTone(800, 'sine', 0.05, 0.05);
    this.vibrate(10);
  }

  public toggle(on: boolean) {
    this.playTone(on ? 1200 : 600, 'sine', 0.1, 0.08);
    this.vibrate(on ? [10, 30, 10] : 20);
  }

  public success() {
    this.playTone(800, 'sine', 0.1, 0.1);
    setTimeout(() => this.playTone(1200, 'sine', 0.1, 0.1), 60);
    this.vibrate([20, 50, 20]);
  }

  public error() {
    this.playTone(200, 'sawtooth', 0.2, 0.1);
    this.vibrate([50, 100, 50]);
  }

  public notify() {
    this.playTone(440, 'sine', 0.1, 0.05);
    this.vibrate(30);
  }
}

export const feedback = new FeedbackEngine();
