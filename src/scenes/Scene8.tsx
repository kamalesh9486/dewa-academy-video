// Scene 8 — Numbers Explosion: burst stats with ring effect, pure div layout
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NeuralNet } from '../components/NeuralNet';
import { AnimIn } from '../components/AnimIn';
import { Eyebrow } from '../components/Eyebrow';
import { colors, dubai } from '../tokens';

const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

interface BurstStatProps {
  value: string;
  label: string;
  accent: string;
  entryFrame: number;
}

const BurstStat: React.FC<BurstStatProps> = ({ value, label, accent, entryFrame }) => {
  const frame = useCurrentFrame();
  const elapsed = frame - entryFrame;

  const scale = elapsed < 0 ? 0
    : elapsed < 11 ? interpolate(elapsed, [0, 11], [2.0, 1.05])
    : interpolate(elapsed, [11, 22], [1.05, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOutBack });

  const opacity = interpolate(elapsed, [0, 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Expanding ring
  const ringR = interpolate(elapsed, [0, 18], [0, 120], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ringO = interpolate(elapsed, [0, 18], [0.5, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'relative', textAlign: 'center', opacity, transform: `scale(${scale})` }}>
      {/* Ring burst — SVG centered under the stat */}
      {ringO > 0.02 && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <svg width={ringR * 2 + 10} height={ringR * 2 + 10} style={{ position: 'absolute' }}>
            <circle cx={ringR + 5} cy={ringR + 5} r={ringR} fill="none" stroke={accent} strokeWidth={2} opacity={ringO} />
          </svg>
        </div>
      )}
      <div style={{
        fontFamily: dubai, fontWeight: 900, fontSize: 86,
        color: accent, lineHeight: 1, letterSpacing: '-3px',
        textShadow: `0 0 50px ${accent}55`,
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: dubai, fontWeight: 300, fontSize: 13,
        color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase',
        letterSpacing: '3px', marginTop: 8,
      }}>
        {label}
      </div>
    </div>
  );
};

const ROW1 = [
  { value: '16+',  label: 'AI Academic Tools',   accent: colors.green,   frame: 18 },
  { value: '5',    label: 'Institutional Roles',  accent: colors.skyBlue, frame: 32 },
  { value: '3',    label: 'Engineering Programs', accent: colors.emerald, frame: 46 },
];
const ROW2 = [
  { value: '30',   label: 'Live AI API Routes',  accent: colors.green,   frame: 62 },
  { value: '<10s', label: 'Exam Q Generation',   accent: colors.amber,   frame: 76 },
  { value: '100%', label: 'UAE Data Residency',  accent: colors.green,   frame: 90 },
];

export const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const bgFade = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Subtle grid lines behind stats
  const gridO = interpolate(frame, [5, 25], [0, 0.055], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#010c07' }}>
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 55%, #012010 0%, #010c07 68%)', opacity: bgFade }} />
      <NeuralNet color={colors.green} opacity={0.22} />

      {/* Grid lines */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: gridO }}>
        <svg width={1920} height={1080}>
          {[640, 960, 1280].map((x) => (
            <line key={x} x1={x} y1={0} x2={x} y2={1080} stroke={colors.green} strokeWidth={0.8} />
          ))}
          <line x1={0} y1={540} x2={1920} y2={540} stroke={colors.green} strokeWidth={0.8} />
        </svg>
      </AbsoluteFill>

      {/* Header */}
      <div style={{ position: 'absolute', top: 62, left: 90 }}>
        <AnimIn delay={8} duration={18} from="left">
          <Eyebrow style={{ marginBottom: 10 }}>By The Numbers</Eyebrow>
          <div style={{ fontFamily: dubai, fontWeight: 700, fontSize: 46, color: colors.white, letterSpacing: '-1px' }}>
            The proof is in the <span style={{ color: colors.green }}>platform.</span>
          </div>
        </AnimIn>
      </div>

      {/* Row 1 */}
      <div style={{
        position: 'absolute',
        top: 280,
        left: 90, right: 90,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 40,
      }}>
        {ROW1.map((s) => (
          <BurstStat key={s.label} value={s.value} label={s.label} accent={s.accent} entryFrame={s.frame} />
        ))}
      </div>

      {/* Divider row */}
      <AnimIn delay={55} duration={16} from="none" style={{ position: 'absolute', top: 530, left: 90, right: 90, display: 'flex', justifyContent: 'center', gap: 20 }}>
        {[0, 1, 2].map((i) => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: `${colors.green}50` }} />)}
      </AnimIn>

      {/* Row 2 */}
      <div style={{
        position: 'absolute',
        top: 570,
        left: 90, right: 90,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 40,
      }}>
        {ROW2.map((s) => (
          <BurstStat key={s.label} value={s.value} label={s.label} accent={s.accent} entryFrame={s.frame} />
        ))}
      </div>

      {/* Compliance badges */}
      <AnimIn delay={112} duration={18} from="bottom" style={{
        position: 'absolute', bottom: 50, left: 90, right: 90,
        display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
      }}>
        {['FERPA', 'GDPR', 'UAE Regulatory', 'KHDA', 'BTEC', 'Azure UAE North'].map((b) => (
          <div key={b} style={{
            fontFamily: dubai, fontWeight: 500, fontSize: 11, color: colors.green,
            textTransform: 'uppercase', letterSpacing: '2px',
            padding: '5px 12px', border: `1px solid ${colors.green}35`, borderRadius: 6,
          }}>{b}</div>
        ))}
      </AnimIn>
    </AbsoluteFill>
  );
};
