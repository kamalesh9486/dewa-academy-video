// Orbital ring display — clusters on inner ring, tools on outer ring
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { colors, dubai } from '../tokens';

export interface ClusterDef {
  name: string;
  color: string;
  tools: string[];
}

interface OrbitProps {
  cx: number;
  cy: number;
  clusters: ClusterDef[];
  startFrame?: number;
}

const TWO_PI = Math.PI * 2;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export const Orbit: React.FC<OrbitProps> = ({
  cx, cy, clusters, startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;

  const appear = interpolate(elapsed, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut });

  // Rings rotate at different speeds
  const innerRot = (elapsed / 600) * TWO_PI;   // one full rotation per 600 frames
  const outerRot = -(elapsed / 900) * TWO_PI;  // counter-rotate

  const IR = 175; // inner radius
  const OR = 330; // outer radius

  // All 16 tools flattened
  const allTools = clusters.flatMap((c, ci) =>
    c.tools.map((t, ti) => ({ label: t, cluster: ci, localIndex: ti, color: c.color }))
  );

  const hubPulse = 0.92 + 0.08 * Math.sin(elapsed / 20);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0, opacity: appear, pointerEvents: 'none' }}
    >
      {/* Outer ring guide */}
      <circle cx={cx} cy={cy} r={OR} fill="none" stroke={colors.green} strokeOpacity={0.10} strokeWidth={1} />
      {/* Inner ring guide */}
      <circle cx={cx} cy={cy} r={IR} fill="none" stroke={colors.green} strokeOpacity={0.14} strokeWidth={1} />

      {/* Hub glow layers */}
      <circle cx={cx} cy={cy} r={70 * hubPulse * 1.8} fill={colors.green} opacity={0.07} />
      <circle cx={cx} cy={cy} r={70 * hubPulse * 1.3} fill={colors.green} opacity={0.10} />
      <circle cx={cx} cy={cy} r={70 * hubPulse} fill={colors.darkTeal} />
      <circle cx={cx} cy={cy} r={70 * hubPulse} fill="none" stroke={colors.green} strokeWidth={2} />

      {/* Hub text */}
      <text x={cx} y={cy - 10} textAnchor="middle" fill="white" fontSize={14} fontFamily={dubai} fontWeight={700} letterSpacing={1}>
        Neural
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill={colors.green} fontSize={14} fontFamily={dubai} fontWeight={700} letterSpacing={1}>
        Mentor
      </text>

      {/* Clusters on inner ring */}
      {clusters.map((cluster, ci) => {
        const baseAngle = (ci / clusters.length) * TWO_PI - Math.PI / 2;
        const angle = baseAngle + innerRot;
        const x = cx + Math.cos(angle) * IR;
        const y = cy + Math.sin(angle) * IR;

        const clusterAppear = interpolate(elapsed, [20 + ci * 8, 40 + ci * 8], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut,
        });

        // Line from hub to cluster
        const lineProgress = interpolate(elapsed, [10 + ci * 6, 28 + ci * 6], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });
        const lx = cx + (x - cx) * lineProgress;
        const ly = cy + (y - cy) * lineProgress;

        return (
          <g key={cluster.name} opacity={clusterAppear}>
            <line x1={cx} y1={cy} x2={lx} y2={ly} stroke={cluster.color} strokeOpacity={0.4} strokeWidth={1} strokeDasharray="4 4" />
            <circle cx={x} cy={y} r={32} fill={cluster.color} opacity={0.15} />
            <circle cx={x} cy={y} r={22} fill="#0d1f18" />
            <circle cx={x} cy={y} r={22} fill="none" stroke={cluster.color} strokeWidth={1.5} />
            <text x={x} y={y - 28} textAnchor="middle" fill={cluster.color} fontSize={11} fontFamily={dubai} fontWeight={700} letterSpacing={0.5}>
              {cluster.name.split(' ')[0]}
            </text>
            <text x={x} y={y - 14} textAnchor="middle" fill={cluster.color} fontSize={10} fontFamily={dubai} letterSpacing={0.5}>
              {cluster.name.split(' ').slice(1).join(' ')}
            </text>
          </g>
        );
      })}

      {/* Tools on outer ring */}
      {allTools.map((tool, ti) => {
        const baseAngle = (ti / allTools.length) * TWO_PI - Math.PI / 2;
        const angle = baseAngle + outerRot;
        const x = cx + Math.cos(angle) * OR;
        const y = cy + Math.sin(angle) * OR;

        const toolAppear = interpolate(elapsed, [50 + ti * 5, 68 + ti * 5], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeOut,
        });

        // Find matching cluster for this tool's color
        const clusterAngle = (tool.cluster / clusters.length) * TWO_PI - Math.PI / 2 + innerRot;
        const cix = cx + Math.cos(clusterAngle) * IR;
        const ciy = cy + Math.sin(clusterAngle) * IR;

        return (
          <g key={tool.label} opacity={toolAppear}>
            <line x1={cix} y1={ciy} x2={x} y2={y} stroke={tool.color} strokeOpacity={0.18} strokeWidth={0.8} />
            <circle cx={x} cy={y} r={5} fill={tool.color} opacity={0.8} />
            <text
              x={x + Math.cos(angle) * 18}
              y={y + Math.sin(angle) * 18 + 4}
              textAnchor={Math.cos(angle) > 0 ? 'start' : 'end'}
              fill="rgba(255,255,255,0.7)"
              fontSize={12}
              fontFamily={dubai}
            >
              {tool.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
