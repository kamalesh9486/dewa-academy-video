// Scene 6 — Institution Control + parentview: org hierarchy with flowing data + live admin demo
import React from 'react';
import { AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { BrowserFrame } from '../components/BrowserFrame';
import { AnimIn } from '../components/AnimIn';
import { Eyebrow } from '../components/Eyebrow';
import { NeuralNet } from '../components/NeuralNet';
import { colors, dubai } from '../tokens';

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Org chart nodes
const NODES = [
  { id: 'admin',    label: 'System Administrator', sub: 'Platform · Governance · Models', color: colors.terracotta, y: 0 },
  { id: 'principal',label: 'Principal',             sub: 'Staff · Enrollment · Readiness', color: colors.amber,     y: 155 },
  { id: 'academic', label: 'Academic Staff',        sub: 'Timetables · Sections · Subjects', color: colors.skyBlue, y: 310 },
  { id: 'prof',     label: 'Professor',             sub: 'Lessons · Library · Attendance', color: colors.green,    y: 465 },
  { id: 'student',  label: 'Student',               sub: 'Neural Mentor · 16+ AI Tools', color: colors.emerald,   y: 620 },
];

// Flow dot that travels down the hierarchy
const FlowDot: React.FC<{ delay: number; speed: number; color: string }> = ({ delay, speed, color }) => {
  const frame = useCurrentFrame();
  const travel = ((frame - delay) * speed) % 700;
  const visible = frame > delay;
  if (!visible || travel < 0) return null;
  return (
    <div style={{
      position: 'absolute',
      left: 18,
      top: travel,
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: color,
      boxShadow: `0 0 8px ${color}`,
      opacity: 0.9,
      transform: 'translateX(-50%)',
    }} />
  );
};

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const bgFade = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#010e09' }}>
      <AbsoluteFill style={{ background: 'linear-gradient(155deg, #011208 0%, #010a06 100%)', opacity: bgFade }} />
      <NeuralNet color={colors.green} opacity={0.15} />

      {/* ── LEFT: Org hierarchy with flowing data ── */}
      <div style={{ position: 'absolute', left: 80, top: 80, width: 700 }}>
        <AnimIn delay={8} duration={20} from="left">
          <Eyebrow style={{ marginBottom: 22 }}>Institutional Hierarchy</Eyebrow>
          <div style={{ fontFamily: dubai, fontWeight: 700, fontSize: 48, color: colors.white, letterSpacing: '-1.2px', lineHeight: 1.1, marginBottom: 36 }}>
            Five roles.<br /><span style={{ color: colors.green }}>One unified platform.</span>
          </div>
        </AnimIn>

        {/* Flow line + nodes */}
        <div style={{ position: 'relative', paddingLeft: 44 }}>
          {/* Vertical spine */}
          <div style={{
            position: 'absolute', left: 18, top: 20, width: 2, height: 680,
            background: `linear-gradient(180deg, ${colors.terracotta}60, ${colors.amber}60, ${colors.skyBlue}60, ${colors.green}60, ${colors.emerald}60)`,
          }} />

          {/* Flow dots moving down the spine */}
          <div style={{ position: 'absolute', left: 18, top: 0, width: 2, height: 700, overflow: 'hidden' }}>
            <FlowDot delay={60} speed={3.5} color={colors.green} />
            <FlowDot delay={90} speed={2.8} color={colors.skyBlue} />
            <FlowDot delay={120} speed={4.0} color={colors.amber} />
          </div>

          {/* Nodes */}
          {NODES.map((node, i) => {
            const p = interpolate(frame - (10 + i * 14), [0, 22], [0, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut,
            });
            return (
              <div key={node.id} style={{
                position: 'absolute',
                left: 44,
                top: node.y + 8,
                opacity: p,
                transform: `translateX(${(1 - p) * 20}px)`,
              }}>
                {/* Connector dot on spine */}
                <div style={{
                  position: 'absolute', left: -30, top: 14,
                  width: 10, height: 10, borderRadius: '50%',
                  background: node.color, boxShadow: `0 0 10px ${node.color}`,
                }} />
                {/* Horizontal connector */}
                <div style={{
                  position: 'absolute', left: -26, top: 18,
                  width: 22, height: 1, background: `${node.color}60`,
                }} />

                <div style={{
                  background: 'rgba(0,0,0,0.45)',
                  border: `1px solid ${node.color}30`,
                  borderLeft: `3px solid ${node.color}`,
                  borderRadius: 10,
                  padding: '12px 20px',
                  width: 580,
                }}>
                  <div style={{ fontFamily: dubai, fontWeight: 700, fontSize: 18, color: node.color, marginBottom: 3 }}>{node.label}</div>
                  <div style={{ fontFamily: dubai, fontWeight: 300, fontSize: 13, color: colors.textMuted }}>{node.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── RIGHT: parentview demo ── */}
      <AnimIn delay={14} duration={24} from="right" distance={50} style={{
        position: 'absolute', right: 80, top: 80, width: 820, bottom: 60,
      }}>
        <Eyebrow color={colors.amber} style={{ marginBottom: 18 }}>Platform Administration · Live View</Eyebrow>
        <BrowserFrame url="dewa-academy.ai/admin/dashboard" glowColor={colors.amber}>
          <OffthreadVideo
            src={staticFile('video/parentview-mute.mp4')}
            muted
            playbackRate={2}
            style={{ width: '100%', display: 'block' }}
          />
        </BrowserFrame>
        <div style={{
          position: 'absolute', bottom: 16, right: 16,
          background: 'rgba(0,0,0,0.75)', border: `1px solid ${colors.amber}40`,
          borderRadius: 8, padding: '5px 12px',
          fontFamily: dubai, fontSize: 11, color: colors.amber, letterSpacing: '2px',
        }}>
          2× SPEED · ADMIN VIEW
        </div>
      </AnimIn>
    </AbsoluteFill>
  );
};
