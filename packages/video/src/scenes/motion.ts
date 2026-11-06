import type { CSSProperties } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const RISE_DISTANCE_PX = 40;

export const useFadeUp = (startFrame: number): CSSProperties => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - startFrame, fps, config: { damping: 200 } });
  return { opacity: progress, transform: `translateY(${interpolate(progress, [0, 1], [RISE_DISTANCE_PX, 0])}px)` };
};

export const useIsShown = (startFrame: number): boolean => useCurrentFrame() >= startFrame;
