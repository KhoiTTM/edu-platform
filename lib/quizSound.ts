// Tiny Web Audio API beep generator for quiz feedback — no audio files needed.
let sharedAudioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedAudioContext) {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return null;
    sharedAudioContext = new Ctx();
  }
  return sharedAudioContext;
}

function playTone(frequencies: number[], duration: number) {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();

  frequencies.forEach((freq, i) => {
    const startTime = ctx.currentTime + i * duration;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(0.15, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  });
}

export function playCorrectSound() {
  playTone([523.25, 659.25, 783.99], 0.12); // C5 - E5 - G5, ascending happy chime
}

export function playIncorrectSound() {
  playTone([220, 174.61], 0.18); // A3 - F3, descending low buzz
}
