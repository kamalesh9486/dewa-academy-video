import React from 'react';
import { Composition } from 'remotion';
import { Main } from './Main';
import { fps, width, height } from './tokens';
import { totalDurationInFrames } from './timeline';

export const Root: React.FC = () => (
  <Composition
    id="DewaAcademy"
    component={Main}
    durationInFrames={totalDurationInFrames}
    fps={fps}
    width={width}
    height={height}
  />
);
