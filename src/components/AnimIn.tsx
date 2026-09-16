import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

type Direction = 'bottom' | 'top' | 'left' | 'right' | 'none';

interface AnimInProps {
  delay?: number;
  duration?: number;
  from?: Direction;
  distance?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const AnimIn: React.FC<AnimInProps> = ({
  delay = 0,
  duration = 20,
  from = 'bottom',
  distance = 36,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOutCubic,
  });

  const d = (1 - p) * distance;
  const tx: Record<Direction, string> = {
    bottom: `translateY(${d}px)`,
    top: `translateY(${-d}px)`,
    left: `translateX(${-d}px)`,
    right: `translateX(${d}px)`,
    none: 'none',
  };

  return (
    <div style={{ opacity: p, transform: tx[from], willChange: 'opacity, transform', ...style }}>
      {children}
    </div>
  );
};
