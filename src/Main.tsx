import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';
import { Scene5 } from './scenes/Scene5';
import { Scene6 } from './scenes/Scene6';
import { Scene7 } from './scenes/Scene7';
import { Scene8 } from './scenes/Scene8';
import { Scene9 } from './scenes/Scene9';
import { sceneBounds as b, durationOf, voLeadIn } from './timeline';
import { colors } from './tokens';

const fontStyle = `
  @font-face { font-family: "Dubai"; src: url("/fonts/dubai/DubaiW23-Bold.woff2")    format("woff2"); font-weight: 700; font-style: normal; }
  @font-face { font-family: "Dubai"; src: url("/fonts/dubai/DubaiW23-Medium.woff2")  format("woff2"); font-weight: 500; font-style: normal; }
  @font-face { font-family: "Dubai"; src: url("/fonts/dubai/DubaiW23-Regular.woff2") format("woff2"); font-weight: 400; font-style: normal; }
  @font-face { font-family: "Dubai"; src: url("/fonts/dubai/DubaiW23-Light.woff2")   format("woff2"); font-weight: 300; font-style: normal; }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
`;

type Entry = {
  key: string;
  from: number;
  dur: number;
  Comp: React.FC;
  audio: string;
};

const entries: Entry[] = [
  { key: 'scene1', from: b.scene1.from, dur: durationOf(b.scene1), Comp: Scene1, audio: 'audio/scene1.mp3' },
  { key: 'scene2', from: b.scene2.from, dur: durationOf(b.scene2), Comp: Scene2, audio: 'audio/scene2.mp3' },
  { key: 'scene3', from: b.scene3.from, dur: durationOf(b.scene3), Comp: Scene3, audio: 'audio/scene3.mp3' },
  { key: 'scene4', from: b.scene4.from, dur: durationOf(b.scene4), Comp: Scene4, audio: 'audio/scene4.mp3' },
  { key: 'scene5', from: b.scene5.from, dur: durationOf(b.scene5), Comp: Scene5, audio: 'audio/scene5.mp3' },
  { key: 'scene6', from: b.scene6.from, dur: durationOf(b.scene6), Comp: Scene6, audio: 'audio/scene6.mp3' },
  { key: 'scene7', from: b.scene7.from, dur: durationOf(b.scene7), Comp: Scene7, audio: 'audio/scene7.mp3' },
  { key: 'scene8', from: b.scene8.from, dur: durationOf(b.scene8), Comp: Scene8, audio: 'audio/scene8.mp3' },
  { key: 'scene9', from: b.scene9.from, dur: durationOf(b.scene9), Comp: Scene9, audio: 'audio/scene9.mp3' },
];

export const Main: React.FC = () => (
  <AbsoluteFill style={{ background: colors.bg, fontFamily: '"Dubai", "Segoe UI", sans-serif' }}>
    <style>{fontStyle}</style>
    {entries.map(({ key, from, dur, Comp, audio }) => (
      <Sequence key={key} from={from} durationInFrames={dur} name={key}>
        <Comp />
        {/* VO starts after the 0.4s scene lead-in */}
        <Sequence from={voLeadIn} name={`${key}-vo`}>
          <Audio src={staticFile(audio)} />
        </Sequence>
      </Sequence>
    ))}
  </AbsoluteFill>
);
