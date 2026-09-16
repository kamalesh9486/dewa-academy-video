// Scene 7 — Engineering Programs: SVG circuit traces draw per discipline, div panels for content
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { AnimIn } from '../components/AnimIn';
import { Eyebrow } from '../components/Eyebrow';
import { NeuralNet } from '../components/NeuralNet';
import { colors, dubai } from '../tokens';

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// SVG circuit trace: just the path + dot, no foreignObject
const CircuitTrace: React.FC<{
  color: string; pathD: string; length: number;
  dotX: number; dotY: number; startFrame: number;
}> = ({ color, pathD, length, dotX, dotY, startFrame }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - startFrame, [0, 55], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut,
  });
  const dashOffset = length * (1 - progress);
  const dotOpacity = interpolate(frame - startFrame, [50, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const glow = 0.6 + 0.4 * Math.sin(frame / 14);

  return (
    <g>
      {/* Glow duplicate */}
      <path d={pathD} fill="none" stroke={color} strokeWidth={4} strokeOpacity={0.12}
        strokeDasharray={length} strokeDashoffset={dashOffset} strokeLinecap="square" />
      {/* Main trace */}
      <path d={pathD} fill="none" stroke={color} strokeWidth={1.5} strokeOpacity={0.65}
        strokeDasharray={length} strokeDashoffset={dashOffset} strokeLinecap="square" />
      {/* Terminal dot */}
      <circle cx={dotX} cy={dotY} r={10} fill={color} opacity={dotOpacity * glow * 0.15} />
      <circle cx={dotX} cy={dotY} r={5}  fill={color} opacity={dotOpacity * 0.9} />
    </g>
  );
};

interface ProgDef {
  code: string; name: string; color: string;
  topics: string[];
  circuit: { path: string; length: number; dotX: number; dotY: number };
  entryFrame: number;
  left: number; // px from left
}

const PROGRAMS: ProgDef[] = [
  {
    code: 'EE', name: 'Electrical Engineering', color: colors.skyBlue,
    topics: ['Circuits & Power Systems', 'Electrical Theory', 'Lab Analysis', 'Safety Standards & IEC'],
    circuit: { path: 'M 60 340 L 60 300 L 140 300 L 140 260 L 240 260 L 240 300 L 360 300 L 360 240 L 480 240 L 480 280 L 540 280', length: 700, dotX: 540, dotY: 280 },
    entryFrame: 22, left: 60,
  },
  {
    code: 'ME', name: 'Mechanical Engineering', color: colors.green,
    topics: ['Mechanics & Thermodynamics', 'Materials Science', 'Fluid Systems', 'Pre/Post-Lab Feedback'],
    circuit: { path: 'M 60 280 L 120 280 L 120 240 L 220 240 L 220 300 L 320 300 L 320 240 L 440 240 L 440 300 L 540 300', length: 680, dotX: 540, dotY: 300 },
    entryFrame: 36, left: 680,
  },
  {
    code: 'MT', name: 'Mechatronics', color: colors.emerald,
    topics: ['Sensors & Actuators', 'PLC Programming', 'Automation Systems', 'Control Engineering'],
    circuit: { path: 'M 60 260 L 140 260 L 140 320 L 240 320 L 240 260 L 340 260 L 340 320 L 420 320 L 420 260 L 540 260', length: 660, dotX: 540, dotY: 260 },
    entryFrame: 50, left: 1300,
  },
];

export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const bgFade = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#010c08' }}>
      <AbsoluteFill style={{ background: 'linear-gradient(170deg, #010d09 0%, #000c06 100%)', opacity: bgFade }} />
      <NeuralNet color={colors.green} opacity={0.14} />

      {/* Header */}
      <div style={{ position: 'absolute', top: 55, left: 80 }}>
        <AnimIn delay={8} duration={20} from="left">
          <Eyebrow style={{ marginBottom: 12 }}>Engineering Programs</Eyebrow>
          <div style={{ fontFamily: dubai, fontWeight: 700, fontSize: 46, color: colors.white, letterSpacing: '-1.2px', lineHeight: 1.1 }}>
            Your discipline. <span style={{ color: colors.green }}>Your AI.</span>
          </div>
        </AnimIn>
      </div>

      {/* Three program panels — absolutely positioned divs, NOT foreignObject */}
      {PROGRAMS.map((prog) => {
        const panelP = interpolate(frame - prog.entryFrame, [0, 26], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut,
        });

        return (
          <div
            key={prog.code}
            style={{
              position: 'absolute',
              left: prog.left,
              top: 165,
              width: 590,
              bottom: 50,
              opacity: panelP,
              transform: `translateY(${(1 - panelP) * 40}px)`,
            }}
          >
            <div style={{
              height: '100%',
              background: 'rgba(0,0,0,0.5)',
              border: `1px solid ${prog.color}22`,
              borderTop: `3px solid ${prog.color}`,
              borderRadius: 16,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}>
              {/* Code + name */}
              <div style={{ padding: '24px 28px 0' }}>
                <div style={{ fontFamily: dubai, fontWeight: 900, fontSize: 48, color: prog.color, letterSpacing: '-2px', lineHeight: 1, marginBottom: 4 }}>
                  {prog.code}
                </div>
                <div style={{ fontFamily: dubai, fontWeight: 500, fontSize: 20, color: colors.white, marginBottom: 22, lineHeight: 1.2 }}>
                  {prog.name}
                </div>

                {/* Topics */}
                {prog.topics.map((t, ti) => {
                  const tp = interpolate(frame - prog.entryFrame - 20 - ti * 8, [0, 18], [0, 1], {
                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                  });
                  return (
                    <div key={t} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      marginBottom: 13,
                      opacity: tp,
                      transform: `translateX(${(1 - tp) * 14}px)`,
                    }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: prog.color, flexShrink: 0 }} />
                      <div style={{ fontFamily: dubai, fontWeight: 300, fontSize: 15, color: colors.textSub, lineHeight: 1.4 }}>{t}</div>
                    </div>
                  );
                })}
              </div>

              {/* Circuit trace area — pure SVG, no foreignObject */}
              <div style={{ flex: 1, position: 'relative', minHeight: 180 }}>
                <svg
                  width="100%" height="100%"
                  viewBox="0 0 600 380"
                  style={{ position: 'absolute', inset: 0 }}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <CircuitTrace
                    color={prog.color}
                    pathD={prog.circuit.path}
                    length={prog.circuit.length}
                    dotX={prog.circuit.dotX}
                    dotY={prog.circuit.dotY}
                    startFrame={prog.entryFrame + 18}
                  />
                </svg>

                {/* AI badge bottom */}
                <div style={{
                  position: 'absolute', bottom: 18, left: 18,
                  fontFamily: dubai, fontWeight: 400, fontSize: 11, color: prog.color,
                  textTransform: 'uppercase', letterSpacing: '3px',
                  border: `1px solid ${prog.color}30`, borderRadius: 5,
                  padding: '4px 10px',
                  background: `${prog.color}08`,
                }}>
                  AI-Powered Support
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Bottom note */}
      <AnimIn delay={110} duration={18} from="bottom" style={{ position: 'absolute', bottom: 14, left: 80 }}>
        <div style={{ fontFamily: dubai, fontWeight: 300, fontSize: 14, color: colors.textMuted }}>
          Domain-aware AI · Lab preparation, execution & post-analysis support across all three programs
        </div>
      </AnimIn>
    </AbsoluteFill>
  );
};
