import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { colors, dubai } from '../tokens';

interface BigStatProps {
  value: string;
  label: string;
  delay?: number;
  accent?: string;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export const BigStat: React.FC<BigStatProps> = ({
  value,
  label,
  delay = 0,
  accent = colors.green,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

  return (
    <div style={{ textAlign: 'center', opacity: p, transform: `translateY(${(1 - p) * 24}px)` }}>
      <div
        style={{
          fontFamily: dubai,
          fontWeight: 700,
          fontSize: 88,
          color: accent,
          lineHeight: 1,
          letterSpacing: '-2px',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: dubai,
          fontWeight: 400,
          fontSize: 16,
          color: colors.textMuted,
          marginTop: 10,
          textTransform: 'uppercase',
          letterSpacing: '2.5px',
        }}
      >
        {label}
      </div>
    </div>
  );
};
