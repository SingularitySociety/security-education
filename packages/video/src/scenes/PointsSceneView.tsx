import type { PointsScene } from "@security-education/course";
import { theme } from "../theme.ts";
import { revealFrame } from "../reveal.ts";
import { useFadeUp } from "./motion.ts";

const PointRow = ({ text, startFrame, number }: { text: string; startFrame: number; number: number }) => (
  <div style={{ ...useFadeUp(startFrame), display: "flex", alignItems: "center", gap: 32 }}>
    <div
      style={{
        flex: "none",
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: theme.accent,
        color: theme.background,
        fontSize: 40,
        fontWeight: 800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {number}
    </div>
    <div style={{ fontSize: 50, lineHeight: 1.35 }}>{text}</div>
  </div>
);

export const PointsSceneView = ({ scene, narrationFrames }: { scene: PointsScene; narrationFrames: number }) => (
  <div>
    <div style={{ ...useFadeUp(0), fontSize: 76, fontWeight: 800, marginBottom: 64 }}>{scene.heading}</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      {scene.points.map((point, index) => (
        <PointRow
          key={point}
          text={point}
          number={index + 1}
          startFrame={revealFrame(index, scene.points.length, narrationFrames)}
        />
      ))}
    </div>
  </div>
);
