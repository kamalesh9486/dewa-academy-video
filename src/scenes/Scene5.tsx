// Scene 5 — AI Tutor + teacherview: how the teacher powers the AI
import React from 'react';
import { AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { BrowserFrame } from '../components/BrowserFrame';
import { AnimIn } from '../components/AnimIn';
import { Eyebrow } from '../components/Eyebrow';
import { NeuralNet } from '../components/NeuralNet';
import { colors, dubai } from '../tokens';

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Simulated AI chat messages
const MESSAGES = [
  { role: 'student', text: "I'm confused about how a PLC controls actuators.", frame: 20 },
  { role: 'ai', text: 'Great question. Let me draw from your Mechatronics notes (Module 4, p.12)…', frame: 48 },
  { role: 'citation', text: '📎 Source: "PLC Fundamentals" — Prof. Al-Rashidi, Semester 2 upload', frame: 70 },
  { role: 'ai', text: 'A PLC sends discrete 24V signals to relay coils, which switch contactors…', frame: 90 },
];

const ChatBubble: React.FC<{ msg: typeof MESSAGES[0] }> = ({ msg }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - msg.frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut,
  });

  const isStudent = msg.role === 'student';
  const isCitation = msg.role === 'citation';

  return (
    <div style={{
      opacity: p,
      transform: `translateY(${(1 - p) * 16}px)`,
      display: 'flex',
      justifyContent: isStudent ? 'flex-end' : 'flex-start',
      marginBottom: 12,
    }}>
      <div style={{
        maxWidth: '88%',
        background: isStudent ? `linear-gradient(135deg, ${colors.darkTeal}, ${colors.green})`
          : isCitation ? 'rgba(0,117,96,0.12)'
          : 'rgba(255,255,255,0.07)',
        border: isCitation ? `1px solid ${colors.green}40` : '1px solid rgba(255,255,255,0.06)',
        borderRadius: isStudent ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
        padding: '12px 16px',
        fontFamily: dubai,
        fontWeight: isCitation ? 500 : 300,
        fontSize: isCitation ? 13 : 15,
        color: isCitation ? colors.green : colors.white,
        lineHeight: 1.5,
        letterSpacing: isCitation ? '0.3px' : 0,
      }}>
        {msg.text}
      </div>
    </div>
  );
};

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const bgFade = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Waveform animation (voice feature)
  const waveFrame = frame;
  const bars = Array.from({ length: 20 }, (_, i) => {
    const h = 8 + 28 * Math.abs(Math.sin(waveFrame / 8 + i * 0.7));
    return h;
  });

  const clockTick = Math.floor(frame / 2) % 60;
  const hours = Math.floor(frame / 120) % 24;

  return (
    <AbsoluteFill style={{ background: '#020e09' }}>
      <AbsoluteFill style={{ background: 'linear-gradient(165deg, #020e09 0%, #001508 100%)', opacity: bgFade }} />
      <NeuralNet color={colors.green} opacity={0.2} />

      {/* ── LEFT COLUMN: teacherview demo ── */}
      <AnimIn delay={8} duration={22} from="left" distance={40} style={{ position: 'absolute', left: 80, top: 80, width: 820, bottom: 60 }}>
        <Eyebrow color={colors.amber} style={{ marginBottom: 18 }}>Professor Uploads · AI Indexes · Students Learn</Eyebrow>
        <BrowserFrame url="dewa-academy.ai/professor/library" glowColor={colors.amber}>
          <OffthreadVideo
            src={staticFile('video/teacherview-mute.mp4')}
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
          2× SPEED · PROFESSOR VIEW
        </div>
      </AnimIn>

      {/* ── RIGHT COLUMN: AI Tutor features ── */}
      <div style={{ position: 'absolute', right: 80, top: 80, width: 860, bottom: 60, display: 'flex', flexDirection: 'column', gap: 0 }}>

        <AnimIn delay={12} duration={20} from="right" distance={30}>
          <Eyebrow style={{ marginBottom: 16 }}>Live AI Tutor</Eyebrow>
          <div style={{ fontFamily: dubai, fontWeight: 700, fontSize: 40, color: colors.white, lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 28 }}>
            The tutor that knows
            <span style={{ color: colors.green }}> which page you're on.</span>
          </div>
        </AnimIn>

        {/* Simulated chat */}
        <AnimIn delay={16} duration={18} from="bottom" distance={20}>
          <div style={{
            background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 16, padding: '20px 20px 16px', flex: 1, marginBottom: 20,
          }}>
            {MESSAGES.map((m, i) => <ChatBubble key={i} msg={m} />)}
          </div>
        </AnimIn>

        {/* Feature pills row */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {[
            { label: '24/7 Available', color: colors.green, frame: 30 },
            { label: 'Citation-Grounded', color: colors.skyBlue, frame: 40 },
            { label: 'Voice + Text', color: colors.amber, frame: 50 },
            { label: 'Notebook Saved', color: colors.emerald, frame: 60 },
          ].map((f) => {
            const fp = interpolate(frame - f.frame, [0, 16], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <div key={f.label} style={{
                opacity: fp, transform: `translateY(${(1 - fp) * 12}px)`,
                display: 'flex', alignItems: 'center', gap: 8,
                background: `${f.color}12`, border: `1px solid ${f.color}40`,
                borderRadius: 8, padding: '8px 14px',
              }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: f.color, flexShrink: 0 }} />
                <div style={{ fontFamily: dubai, fontWeight: 500, fontSize: 14, color: f.color }}>{f.label}</div>
              </div>
            );
          })}
        </div>

        {/* Live voice waveform */}
        <AnimIn delay={80} duration={18} from="bottom" style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ fontFamily: dubai, fontSize: 12, color: colors.textMuted, marginRight: 10, textTransform: 'uppercase', letterSpacing: '2px' }}>Voice</div>
          {bars.map((h, i) => (
            <div key={i} style={{
              width: 3, height: h, background: colors.green,
              borderRadius: 2, opacity: 0.7,
            }} />
          ))}
          <div style={{ fontFamily: dubai, fontSize: 12, color: colors.textMuted, marginLeft: 10 }}>Active</div>
        </AnimIn>
      </div>
    </AbsoluteFill>
  );
};
