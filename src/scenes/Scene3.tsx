// Scene 3 — Solution: CSS 3D holographic layer stack (sovereignty architecture)
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NeuralNet } from '../components/NeuralNet';
import { AnimIn } from '../components/AnimIn';
import { Eyebrow } from '../components/Eyebrow';
import { colors, dubai } from '../tokens';

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const LAYERS = [
  {
    id: 'app',
    label: 'Application Layer',
    sublabel: 'Student Dashboard · Professor Tools · Institutional Analytics',
    color: colors.skyBlue,
    bg: 'linear-gradient(90deg, rgba(51,178,231,0.18) 0%, rgba(51,178,231,0.06) 100%)',
    border: `rgba(51,178,231,0.45)`,
    icon: '◈',
    entryFrame: 20,
  },
  {
    id: 'sov',
    label: 'Sovereignty Backbone',
    sublabel: 'On-Premise Infrastructure · Network Isolation · Access Management',
    color: colors.green,
    bg: 'linear-gradient(90deg, rgba(0,117,96,0.22) 0%, rgba(0,117,96,0.08) 100%)',
    border: `rgba(0,117,96,0.5)`,
    icon: '⬡',
    entryFrame: 36,
  },
  {
    id: 'core',
    label: 'Institutional Core',
    sublabel: 'Governance & Policy · Ethical Standards · Data Standards',
    color: colors.amber,
    bg: 'linear-gradient(90deg, rgba(245,158,11,0.18) 0%, rgba(245,158,11,0.06) 100%)',
    border: `rgba(245,158,11,0.45)`,
    icon: '⬟',
    entryFrame: 52,
  },
];

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();

  const bgFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#001a11' }}>
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 40% 50%, #002a1d 0%, #001008 75%)', opacity: bgFade }} />
      <NeuralNet color={colors.green} opacity={0.25} />

      {/* Left headline */}
      <div style={{ position: 'absolute', left: 90, top: 110, width: 520 }}>
        <AnimIn delay={8} duration={20} from="left">
          <Eyebrow style={{ marginBottom: 28 }}>DEWA's Answer</Eyebrow>
        </AnimIn>
        <AnimIn delay={15} duration={28} from="bottom" distance={50}>
          <div style={{ fontFamily: dubai, fontWeight: 700, fontSize: 62, color: colors.white, lineHeight: 1.05, letterSpacing: '-1.5px' }}>
            Not a tool.<br />
            Not a product.
          </div>
          <div style={{ fontFamily: dubai, fontWeight: 700, fontSize: 62, color: colors.green, lineHeight: 1.05, letterSpacing: '-1.5px', marginBottom: 28 }}>
            An ecosystem.
          </div>
        </AnimIn>
        <AnimIn delay={38} duration={22} from="bottom" distance={20}>
          <div style={{ fontFamily: dubai, fontWeight: 300, fontSize: 19, color: colors.textMuted, lineHeight: 1.7 }}>
            Three layers of institutional sovereignty — running on DEWA's own infrastructure, governed by DEWA's rules.
          </div>
        </AnimIn>

        {/* Data residency badge */}
        <AnimIn delay={55} duration={20} from="bottom" distance={16}>
          <div style={{
            marginTop: 32,
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(0,117,96,0.1)', border: '1px solid rgba(0,117,96,0.3)',
            borderRadius: 8, padding: '10px 18px',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.green }} />
            <div style={{ fontFamily: dubai, fontWeight: 500, fontSize: 14, color: colors.green }}>100% UAE Data Residency · Azure UAE North</div>
          </div>
        </AnimIn>
      </div>

      {/* 3D Layer Stack — right panel with perspective */}
      <div style={{
        position: 'absolute',
        right: 80,
        top: 80,
        width: 1080,
        height: 900,
        perspective: '1100px',
        perspectiveOrigin: '50% 38%',
      }}>
        {LAYERS.map((layer, i) => {
          const rise = interpolate(frame - layer.entryFrame, [0, 35], [120, 0], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut,
          });
          const opacity = interpolate(frame - layer.entryFrame, [0, 22], [0, 1], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          });

          // Slow gentle tilt animation
          const tiltY = 2 + 1.5 * Math.sin(frame / 80 + i * 1.0);
          const tiltX = 22 - i * 2;

          return (
            <div
              key={layer.id}
              style={{
                position: 'absolute',
                left: 60 + i * 30,
                right: i * 30,
                top: 120 + i * 230 + rise,
                height: 170,
                opacity,
                transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                transformStyle: 'preserve-3d',
                background: layer.bg,
                border: `1px solid ${layer.border}`,
                borderRadius: 16,
                padding: '28px 36px',
                boxSizing: 'border-box',
                boxShadow: `0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)`,
              }}
            >
              {/* Glowing top edge */}
              <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
                background: `linear-gradient(90deg, transparent, ${layer.color}, transparent)`,
                opacity: 0.6,
              }} />

              {/* Layer 3D "depth" pseudo-face */}
              <div style={{
                position: 'absolute', bottom: -14, left: 20, right: 20, height: 14,
                background: `${layer.color}08`,
                border: `1px solid ${layer.border}`,
                borderTop: 'none',
                borderRadius: '0 0 8px 8px',
                transform: 'rotateX(-90deg)',
                transformOrigin: 'top center',
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{ fontFamily: dubai, fontSize: 36, color: layer.color, lineHeight: 1, flexShrink: 0 }}>{layer.icon}</div>
                <div>
                  <div style={{ fontFamily: dubai, fontWeight: 700, fontSize: 22, color: colors.white, marginBottom: 6 }}>{layer.label}</div>
                  <div style={{ fontFamily: dubai, fontWeight: 300, fontSize: 15, color: colors.textMuted, lineHeight: 1.5 }}>{layer.sublabel}</div>
                </div>
              </div>

              {/* Layer badge */}
              <div style={{
                position: 'absolute', top: 20, right: 24,
                fontFamily: dubai, fontSize: 11, color: layer.color,
                textTransform: 'uppercase', letterSpacing: '3px',
                border: `1px solid ${layer.border}`, borderRadius: 5,
                padding: '3px 8px',
              }}>
                L{3 - i}
              </div>
            </div>
          );
        })}

        {/* Connecting vertical pillar between layers */}
        <AnimIn delay={70} duration={20} from="none" style={{ position: 'absolute', left: 100, top: 280, width: 2, height: 380, background: `linear-gradient(180deg, ${colors.skyBlue}60, ${colors.green}60, ${colors.amber}60)`, borderRadius: 1 }}>
          <div style={{ width: '100%', height: '100%' }} />
        </AnimIn>
      </div>
    </AbsoluteFill>
  );
};
