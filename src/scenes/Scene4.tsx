// Scene 4 — Neural Mentor Orbital + studentview live app demo
import React from 'react';
import { AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { Orbit } from '../components/Orbit';
import { BrowserFrame } from '../components/BrowserFrame';
import { AnimIn } from '../components/AnimIn';
import { Eyebrow } from '../components/Eyebrow';
import { NeuralNet } from '../components/NeuralNet';
import { colors, dubai } from '../tokens';

const CLUSTERS = [
  { name: 'Learn & Explore',  color: colors.skyBlue,  tools: ['Live AI Tutor', 'Guided Paths', 'AI Chat', 'Deep Research'] },
  { name: 'Study & Practice', color: colors.green,     tools: ['Smart Solver', 'Practice Qs', 'Flashcards', 'Mind Maps'] },
  { name: 'Create & Present', color: colors.emerald,   tools: ['Audio Summary', 'Video Overview', 'Slides', 'Co-Writer'] },
  { name: 'Organise & Track', color: colors.amber,     tools: ['Library', 'Notebooks', 'Activity Log', 'Idea Generator'] },
];

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const bgFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Video starts with a 0.8s lead-in so the orbital appears first
  const videoLeadIn = 24;

  return (
    <AbsoluteFill style={{ background: '#010d08' }}>
      <AbsoluteFill style={{ background: 'linear-gradient(150deg, #010d08 0%, #001a10 100%)', opacity: bgFade }} />
      <NeuralNet color={colors.green} opacity={0.18} />

      {/* Header */}
      <div style={{ position: 'absolute', top: 60, left: 90, right: 90, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <AnimIn delay={8} duration={18} from="left">
          <Eyebrow>Neural Mentor</Eyebrow>
        </AnimIn>
        <AnimIn delay={12} duration={18} from="right">
          <div style={{ fontFamily: dubai, fontWeight: 700, fontSize: 38, color: colors.green, letterSpacing: '-1px' }}>
            16+ <span style={{ fontWeight: 300, fontSize: 20, color: colors.textMuted, letterSpacing: 0 }}>AI Academic Tools</span>
          </div>
        </AnimIn>
      </div>

      <AnimIn delay={18} duration={24} from="bottom" distance={30} style={{ position: 'absolute', top: 130, left: 90 }}>
        <div style={{ fontFamily: dubai, fontWeight: 700, fontSize: 44, color: colors.white, letterSpacing: '-1px', lineHeight: 1.1 }}>
          One workspace. <span style={{ color: colors.green }}>Every tool a student needs.</span>
        </div>
      </AnimIn>

      {/* Left: Browser frame with studentview demo */}
      <AnimIn delay={videoLeadIn} duration={22} from="left" distance={50} style={{
        position: 'absolute',
        left: 80,
        top: 220,
        width: 820,
        bottom: 60,
      }}>
        <BrowserFrame url="dewa-academy.ai/neural-mentor" glowColor={colors.green}>
          <OffthreadVideo
            src={staticFile('video/studentview-mute.mp4')}
            muted
            playbackRate={2.5}
            style={{ width: '100%', display: 'block' }}
          />
        </BrowserFrame>

        {/* Speed badge */}
        <div style={{
          position: 'absolute', bottom: 16, right: 16,
          background: 'rgba(0,0,0,0.75)', border: `1px solid ${colors.green}40`,
          borderRadius: 8, padding: '5px 12px',
          fontFamily: dubai, fontSize: 11, color: colors.green, letterSpacing: '2px',
        }}>
          2.5× SPEED · LIVE DEMO
        </div>
      </AnimIn>

      {/* Right: Orbital tool galaxy */}
      <Orbit cx={1490} cy={580} clusters={CLUSTERS} startFrame={10} />

      {/* Bottom note */}
      <AnimIn delay={120} duration={18} from="bottom" style={{ position: 'absolute', bottom: 30, left: 80 }}>
        <div style={{ fontFamily: dubai, fontWeight: 300, fontSize: 15, color: colors.textMuted }}>
          Single-click access from any lesson · No separate login · Context-aware from the first word · Available 24/7
        </div>
      </AnimIn>
    </AbsoluteFill>
  );
};
