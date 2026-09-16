// Scene 9 — Close: particles converge, cinematic end card
import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { NeuralNet } from '../components/NeuralNet';
import { AnimIn } from '../components/AnimIn';
import { colors, dubai } from '../tokens';

const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

// Radiating rings from center
const Rings: React.FC = () => {
  const frame = useCurrentFrame();
  const RING_COUNT = 4;
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {Array.from({ length: RING_COUNT }, (_, i) => {
        const period = 120;
        const phase = ((frame + i * (period / RING_COUNT)) % period) / period;
        const r = phase * 500;
        const op = (1 - phase) * 0.25;
        return (
          <circle key={i} cx={960} cy={520} r={r} fill="none" stroke={colors.green} strokeWidth={1} opacity={op} />
        );
      })}
    </svg>
  );
};

export const Scene9: React.FC = () => {
  const frame = useCurrentFrame();

  const bgFade = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const logoScale = interpolate(frame, [18, 48], [0.7, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut });
  const logoOpacity = interpolate(frame, [18, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Horizontal lines that sweep inward from both edges to center, forming a "v" shape
  const lineP = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#000c07' }}>
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 48%, #002015 0%, #000c07 68%)', opacity: bgFade }} />
      <NeuralNet color={colors.green} opacity={0.4} />
      <Rings />

      {/* Center content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* DEWA Logo — white PNG from brand assets */}
        <div style={{ opacity: logoOpacity, transform: `scale(${logoScale})`, marginBottom: 28 }}>
          <Img src={staticFile('dewa-logo-white.png')} style={{ height: 100 }} />
        </div>

        {/* AI Academy */}
        <AnimIn delay={30} duration={28} from="bottom" distance={40}>
          <div style={{ fontFamily: dubai, fontWeight: 700, fontSize: 70, color: colors.white, textAlign: 'center', letterSpacing: '-2px', lineHeight: 1 }}>
            AI Academy
          </div>
          <div style={{
            width: 80, height: 3, background: colors.green,
            margin: '18px auto 0', borderRadius: 2,
          }} />
        </AnimIn>

        {/* Official tagline */}
        <AnimIn delay={46} duration={26} from="bottom" distance={30}>
          <div style={{ fontFamily: dubai, fontWeight: 300, fontSize: 26, color: colors.textSub, textAlign: 'center', marginTop: 26, letterSpacing: '0.5px' }}>
            Empowering Future Engineers Through Applied AI
          </div>
        </AnimIn>

        {/* Sub-line */}
        <AnimIn delay={60} duration={22} from="bottom" distance={16}>
          <div style={{ fontFamily: dubai, fontWeight: 300, fontSize: 15, color: colors.textMuted, textAlign: 'center', marginTop: 18, textTransform: 'uppercase', letterSpacing: '4px' }}>
            Neural Mentor · 16+ AI Tools · UAE Sovereign Infrastructure
          </div>
        </AnimIn>
      </div>

      {/* Converging horizontal accent lines */}
      <div style={{
        position: 'absolute', top: '50%', left: 90, right: 90,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        pointerEvents: 'none',
      }}>
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${colors.green}60)`, width: `${lineP * 38}%` }} />
        <div style={{ height: 1, background: `linear-gradient(270deg, transparent, ${colors.green}60)`, width: `${lineP * 38}%` }} />
      </div>

      {/* Bottom: Gov Dubai logo */}
      <AnimIn delay={70} duration={20} from="bottom" style={{
        position: 'absolute', bottom: 55, left: 90, right: 90,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Img src={staticFile('gov-dubai-white.svg')} style={{ height: 38, opacity: 0.65 }} />
        <div style={{ fontFamily: dubai, fontSize: 12, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '4px' }}>
          Dubai Electricity & Water Authority
        </div>
      </AnimIn>
    </AbsoluteFill>
  );
};
