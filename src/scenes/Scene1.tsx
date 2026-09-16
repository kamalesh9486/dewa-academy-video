// Scene 1 — Hook: Neural network particles + cinematic title
import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { NeuralNet } from '../components/NeuralNet';
import { AnimIn } from '../components/AnimIn';
import { colors, dubai } from '../tokens';

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();

  const bgFade = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Radial pulse expanding from center
  const pulseR = interpolate(frame, [0, 60], [0, 900], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulseO = interpolate(frame, [20, 60], [0.4, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Horizontal scan line that sweeps down once
  const scanY = interpolate(frame, [10, 45], [-20, 1100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#000d09' }}>
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 45%, #002d21 0%, #000d09 65%)', opacity: bgFade }} />

      {/* Neural network sits behind everything */}
      <NeuralNet color={colors.green} opacity={0.5} />

      {/* Expanding radial pulse on entry */}
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        <svg width={1920} height={1080}>
          <circle cx={960} cy={540} r={pulseR} fill="none" stroke={colors.green} strokeWidth={1.5} opacity={pulseO} />
        </svg>
      </AbsoluteFill>

      {/* Horizontal scan sweep */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: scanY,
        height: 1, background: `linear-gradient(90deg, transparent 0%, ${colors.green}88 40%, ${colors.green}88 60%, transparent 100%)`,
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <AnimIn delay={20} duration={22} from="none" style={{ position: 'absolute', top: 80, left: 90 }}>
        <Img src={staticFile('dewa-logo-plus-text.svg')} style={{ height: 50 }} />
      </AnimIn>
      <AnimIn delay={24} duration={22} from="none" style={{ position: 'absolute', top: 82, right: 90 }}>
        <Img src={staticFile('gov-dubai-white.svg')} style={{ height: 44 }} />
      </AnimIn>

      {/* Main title block — left editorial */}
      <div style={{ position: 'absolute', left: 90, top: 185, maxWidth: 1060 }}>
        <AnimIn delay={26} duration={18} from="left" distance={16}>
          <div style={{ fontFamily: dubai, fontWeight: 400, fontSize: 13, color: colors.green, textTransform: 'uppercase', letterSpacing: '6px', marginBottom: 30 }}>
            AI Vision — 2026
          </div>
        </AnimIn>

        <AnimIn delay={32} duration={28} from="bottom" distance={70}>
          <div style={{ fontFamily: dubai, fontWeight: 700, fontSize: 152, color: colors.white, lineHeight: 0.88, letterSpacing: '-5px' }}>
            DEWA
          </div>
          <div style={{ fontFamily: dubai, fontWeight: 300, fontSize: 152, color: colors.green, lineHeight: 0.88, letterSpacing: '-5px', marginBottom: 48 }}>
            Academy.
          </div>
        </AnimIn>

        <AnimIn delay={50} duration={24} from="bottom" distance={30}>
          <div style={{ fontFamily: dubai, fontWeight: 300, fontSize: 29, color: colors.textSub, lineHeight: 1.55 }}>
            The place where Dubai's future engineers are trained.
          </div>
          <div style={{ fontFamily: dubai, fontWeight: 600, fontSize: 29, color: colors.white, marginTop: 6 }}>
            And today, it's getting smarter.
          </div>
        </AnimIn>
      </div>

      {/* Bottom accent */}
      <AnimIn delay={58} duration={18} from="left" style={{ position: 'absolute', bottom: 88, left: 90, right: 90 }}>
        <div style={{ height: 1, background: `linear-gradient(90deg, ${colors.green} 0%, transparent 65%)` }} />
      </AnimIn>
      <AnimIn delay={62} duration={18} from="none" style={{ position: 'absolute', bottom: 54, right: 90 }}>
        <div style={{ fontFamily: dubai, fontSize: 12, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '3px' }}>
          Empowering Future Engineers Through Applied AI
        </div>
      </AnimIn>
    </AbsoluteFill>
  );
};
