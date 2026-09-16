// Deterministic particle-network background — looks like a live AI brain
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

// Seeded deterministic hash — safe integers only, no Math.random()
const sr = (n: number): number => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const COUNT = 48;
const MAX_DIST = 220;

const BASE = Array.from({ length: COUNT }, (_, i) => ({
  x: sr(i * 7 + 1) * 1920,
  y: sr(i * 7 + 2) * 1080,
  vx: (sr(i * 7 + 3) - 0.5) * 0.28,
  vy: (sr(i * 7 + 4) - 0.5) * 0.18,
  r: 1.2 + sr(i * 7 + 5) * 2.0,
  pulse: sr(i * 7 + 6) * 200,
}));

interface NeuralNetProps {
  color?: string;
  opacity?: number;
}

export const NeuralNet: React.FC<NeuralNetProps> = ({
  color = '#007560',
  opacity = 1,
}) => {
  const frame = useCurrentFrame();

  const pts = BASE.map((p) => ({
    x: ((p.x + p.vx * frame) % 1920 + 1920) % 1920,
    y: ((p.y + p.vy * frame) % 1080 + 1080) % 1080,
    r: p.r,
    pulse: p.pulse,
  }));

  // Limit connections per particle to keep line count manageable
  const lines: { x1: number; y1: number; x2: number; y2: number; alpha: number }[] = [];
  for (let i = 0; i < pts.length; i++) {
    let conns = 0;
    for (let j = i + 1; j < pts.length && conns < 3; j++) {
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < MAX_DIST) {
        lines.push({ x1: pts[i].x, y1: pts[i].y, x2: pts[j].x, y2: pts[j].y, alpha: (1 - d / MAX_DIST) * 0.3 });
        conns++;
      }
    }
  }

  return (
    <AbsoluteFill style={{ opacity, pointerEvents: 'none' }}>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        {lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={color} strokeOpacity={l.alpha} strokeWidth={0.8} />
        ))}
        {pts.map((p, i) => {
          const glow = 0.5 + 0.5 * Math.sin((frame + p.pulse) / 45);
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={p.r * 3} fill={color} opacity={glow * 0.08} />
              <circle cx={p.x} cy={p.y} r={p.r} fill={color} opacity={0.55 + glow * 0.3} />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
