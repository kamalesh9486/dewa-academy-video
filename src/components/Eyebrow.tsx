import React from 'react';
import { colors, dubai } from '../tokens';

interface EyebrowProps {
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  color = colors.green,
  style,
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      ...style,
    }}
  >
    <div style={{ width: 40, height: 2, background: color, flexShrink: 0 }} />
    <span
      style={{
        fontFamily: dubai,
        fontWeight: 500,
        fontSize: 14,
        color,
        textTransform: 'uppercase',
        letterSpacing: '4px',
      }}
    >
      {children}
    </span>
  </div>
);
