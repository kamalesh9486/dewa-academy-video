import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface OrbProps {
  x: number;
  y: number;
  size?: number;
  color?: string;
  period?: number;
  offset?: number;
}

export const Orb: React.FC<OrbProps> = ({
  x, y, size = 600, color = '#007560', period = 180, offset = 0,
}) => {
  const frame = useCurrentFrame();
  const phase = ((frame + offset) % period) / period;
  const scale = 1 + interpolate(phase, [0, 0.5, 1], [0, 0.12, 0]);
  const opacity = interpolate(phase, [0, 0.5, 1], [0.10, 0.05, 0.10]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        transform: `scale(${scale})`,
        pointerEvents: 'none',
      }}
    />
  );
};
