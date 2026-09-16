import { fps } from './tokens';

export const sec = (s: number) => Math.round(s * fps);

// Durations = 0.4s VO lead-in + measured ElevenLabs clip + 0.7s tail
// Measured clip lengths (George / eleven_multilingual_v2):
//   scene1: 18.29s  scene2: 21.86s  scene3: 20.09s
//   scene4: 25.10s  scene5: 24.48s  scene6: 28.42s
//   scene7: 25.31s  scene8: 20.30s  scene9: 25.16s
export const voLeadIn = sec(0.4);

const durations = {
  scene1: 19.5,   // 0.4 + 18.29 + 0.8
  scene2: 23.0,   // 0.4 + 21.86 + 0.7
  scene3: 21.5,   // 0.4 + 20.09 + 1.0
  scene4: 26.5,   // 0.4 + 25.10 + 1.0  (studentview at 2.5× covers 13.2s)
  scene5: 26.0,   // 0.4 + 24.48 + 1.1  (teacherview at 2× covers 7.4s)
  scene6: 30.0,   // 0.4 + 28.42 + 1.2  (parentview at 2× covers 9.3s)
  scene7: 27.0,   // 0.4 + 25.31 + 1.3
  scene8: 21.5,   // 0.4 + 20.30 + 0.8
  scene9: 27.0,   // 0.4 + 25.16 + 1.4
} as const;

type SceneKey = keyof typeof durations;
const order: SceneKey[] = [
  'scene1','scene2','scene3','scene4','scene5',
  'scene6','scene7','scene8','scene9',
];

export const sceneBounds = (() => {
  const out = {} as Record<SceneKey, { from: number; to: number }>;
  let cursor = 0;
  for (const key of order) {
    const from = cursor;
    const to = cursor + sec(durations[key]);
    out[key] = { from, to };
    cursor = to;
  }
  return out as { [K in SceneKey]: { from: number; to: number } };
})();

export const totalDurationInFrames = sceneBounds.scene9.to;
export const durationOf = (b: { from: number; to: number }) => b.to - b.from;
