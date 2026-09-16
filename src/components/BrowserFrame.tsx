// Browser/laptop mockup frame for live app demo embeds
import React from 'react';
import { colors } from '../tokens';

interface BrowserFrameProps {
  url?: string;
  children: React.ReactNode;
  glowColor?: string;
  style?: React.CSSProperties;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  url = 'dewa-academy.ai / neural-mentor',
  children,
  glowColor = colors.green,
  style,
}) => (
  <div
    style={{
      borderRadius: 18,
      overflow: 'hidden',
      boxShadow: `
        0 0 0 1px rgba(255,255,255,0.08),
        0 60px 120px rgba(0,0,0,0.75),
        0 0 60px ${glowColor}30,
        0 0 120px ${glowColor}15
      `,
      background: '#0d0d1a',
      ...style,
    }}
  >
    {/* Chrome bar */}
    <div
      style={{
        background: 'linear-gradient(180deg, #1a1a2e, #141428)',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        {['#ff5f56', '#ffbd2e', '#27c93f'].map((c) => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.85 }} />
        ))}
      </div>
      <div
        style={{
          flex: 1,
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 6,
          padding: '4px 12px',
          fontSize: 11,
          color: 'rgba(255,255,255,0.35)',
          fontFamily: 'monospace',
          letterSpacing: '0.3px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        🔒 {url}
      </div>
    </div>
    {/* Video / content */}
    <div style={{ lineHeight: 0 }}>{children}</div>
  </div>
);
