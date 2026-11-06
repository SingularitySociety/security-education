import type { ReactNode } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme.ts";

const FADE_FRAMES = 10;

type SceneShellProps = {
  courseTitle: string;
  sceneIndex: number;
  sceneCount: number;
  frames: number;
  children: ReactNode;
};

const SceneDots = ({ sceneIndex, sceneCount }: { sceneIndex: number; sceneCount: number }) => (
  <div style={{ display: "flex", gap: 12 }}>
    {Array.from({ length: sceneCount }, (_, index) => (
      <div
        key={index}
        style={{
          width: index === sceneIndex ? 48 : 14,
          height: 14,
          borderRadius: 7,
          backgroundColor: index <= sceneIndex ? theme.accent : theme.surfaceRaised,
        }}
      />
    ))}
  </div>
);

export const SceneShell = ({ courseTitle, sceneIndex, sceneCount, frames, children }: SceneShellProps) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, FADE_FRAMES, frames - FADE_FRAMES, frames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity, padding: "56px 96px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
        <span style={{ color: theme.accent, fontWeight: 700, letterSpacing: 2 }}>セキュリティ教育</span>
        <span style={{ color: theme.textMuted }}>{courseTitle}</span>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>{children}</div>
      <SceneDots sceneIndex={sceneIndex} sceneCount={sceneCount} />
    </AbsoluteFill>
  );
};
