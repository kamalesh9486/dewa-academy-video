// Scene 2 — The Problem: WORD SLAM — each problem word fills the screen then compresses
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NeuralNet } from '../components/NeuralNet';
import { colors, dubai } from '../tokens';

const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

interface SlamWordProps {
  word: string;
  sub: string;
  accent: string;
  entryFrame: number;
  finalY: number;   // settled Y position (px from top)
  finalSize: number;
}

const SlamWord: React.FC<SlamWordProps> = ({ word, sub, accent, entryFrame, finalY, finalSize }) => {
  const frame = useCurrentFrame();
  const slam = interpolate(frame - entryFrame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOutExpo,
  });
  const settle = interpolate(frame - entryFrame, [8, 28], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut,
  });

  const size = finalSize + settle * (380 - finalSize);
  const opacity = interpolate(frame - entryFrame, [0, 6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Chromatic aberration on slam impact
  const aberr = interpolate(frame - entryFrame, [0, 4, 8], [0, 6, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{
      position: 'absolute',
      left: 90,
      top: finalY,
      opacity,
    }}>
      {/* Chromatic layers */}
      {aberr > 0.5 && (
        <>
          <div style={{ position: 'absolute', fontFamily: dubai, fontWeight: 900, fontSize: size, color: '#ff003355', transform: `translate(-${aberr}px, 0)`, lineHeight: 1, whiteSpace: 'nowrap' }}>{word}</div>
          <div style={{ position: 'absolute', fontFamily: dubai, fontWeight: 900, fontSize: size, color: '#00ff3355', transform: `translate(${aberr}px, 0)`, lineHeight: 1, whiteSpace: 'nowrap' }}>{word}</div>
        </>
      )}
      <div style={{ fontFamily: dubai, fontWeight: 900, fontSize: size, color: accent, lineHeight: 1, whiteSpace: 'nowrap', position: 'relative' }}>
        {word}
      </div>
      <div style={{
        fontFamily: dubai, fontWeight: 300, fontSize: Math.max(14, finalSize * 0.28),
        color: 'rgba(255,255,255,0.55)', marginTop: size * 0.04, transition: 'none',
        opacity: interpolate(frame - entryFrame, [20, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }}>
        {sub}
      </div>
    </div>
  );
};

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();

  const bgShift = interpolate(frame, [0, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bgColor = `rgba(${Math.round(bgShift * 30)}, ${Math.round(8 - bgShift * 2)}, ${Math.round(5 - bgShift)}, 1)`;

  // Vertical crack SVGs that appear after each word settles
  const crack1 = interpolate(frame, [35, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const crack2 = interpolate(frame, [75, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const crack3 = interpolate(frame, [115, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const crack4 = interpolate(frame, [155, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#070c0a' }}>
      <AbsoluteFill style={{ background: `linear-gradient(160deg, ${bgColor} 0%, #020806 100%)` }} />

      <NeuralNet color="#ff5533" opacity={0.12} />

      {/* Full-screen backdrop warning tint */}
      <AbsoluteFill style={{
        background: `radial-gradient(ellipse at 50% 50%, rgba(180,40,20,${bgShift * 0.08}) 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Crack SVG lines radiating from impact points */}
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        <svg width={1920} height={1080} style={{ opacity: 0.3 }}>
          <line x1={280} y1={180} x2={340} y2={320} stroke="#ff4422" strokeWidth={1} opacity={crack1} />
          <line x1={280} y1={180} x2={190} y2={290} stroke="#ff4422" strokeWidth={0.8} opacity={crack1} />
          <line x1={400} y1={390} x2={480} y2={520} stroke="#ff4422" strokeWidth={1} opacity={crack2} />
          <line x1={400} y1={390} x2={310} y2={510} stroke="#ff4422" strokeWidth={0.7} opacity={crack2} />
          <line x1={300} y1={590} x2={380} y2={720} stroke="#ff4422" strokeWidth={1} opacity={crack3} />
          <line x1={500} y1={780} x2={600} y2={900} stroke="#ff4422" strokeWidth={1} opacity={crack4} />
        </svg>
      </AbsoluteFill>

      {/* Eyebrow */}
      {frame > 5 && (
        <div style={{
          position: 'absolute', top: 80, left: 90,
          fontFamily: dubai, fontWeight: 400, fontSize: 12, color: '#ff6644',
          textTransform: 'uppercase', letterSpacing: '5px',
          opacity: interpolate(frame, [5, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}>
          ⚠ The Challenge
        </div>
      )}

      {/* Word slams — stagger every ~40 frames */}
      <SlamWord word="SCALE" sub="One teacher cannot adapt to 30 different learning profiles." accent={colors.green} entryFrame={18} finalY={100} finalSize={70} />
      <SlamWord word="WORKLOAD" sub="Professors spend hours answering the same questions, again and again." accent="#ffb347" entryFrame={58} finalY={300} finalSize={70} />
      <SlamWord word="ENGAGEMENT" sub="Digital tools exist but they do not truly interact with the student." accent={colors.skyBlue} entryFrame={98} finalY={500} finalSize={70} />
      <SlamWord word="PRIVACY" sub="Institutions cannot use consumer AI tools with student data at risk." accent="#ff5577" entryFrame={138} finalY={700} finalSize={70} />

      {/* Right side — "4 Problems" counter */}
      <div style={{
        position: 'absolute', right: 90, top: '50%', transform: 'translateY(-50%)',
        textAlign: 'right',
        opacity: interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }}>
        <div style={{ fontFamily: dubai, fontWeight: 900, fontSize: 220, color: 'rgba(255,255,255,0.03)', lineHeight: 1, letterSpacing: '-8px' }}>4</div>
        <div style={{ fontFamily: dubai, fontWeight: 300, fontSize: 18, color: 'rgba(255,255,255,0.4)', marginTop: -60 }}>INTERLOCKING</div>
        <div style={{ fontFamily: dubai, fontWeight: 700, fontSize: 18, color: 'rgba(255,255,255,0.4)', letterSpacing: '3px' }}>FAILURES</div>
      </div>
    </AbsoluteFill>
  );
};
