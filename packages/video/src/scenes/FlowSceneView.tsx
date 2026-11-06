import type { FlowScene, FlowStep } from "@security-education/course";
import { theme } from "../theme.ts";
import { revealFrame } from "../reveal.ts";
import { useFadeUp } from "./motion.ts";

const toneColor = { normal: theme.accent, danger: theme.danger, safe: theme.safe } as const;

const StepBox = ({ step, startFrame }: { step: FlowStep; startFrame: number }) => (
  <div
    style={{
      ...useFadeUp(startFrame),
      flex: 1,
      minWidth: 0,
      backgroundColor: theme.surface,
      borderTop: `8px solid ${toneColor[step.tone]}`,
      borderRadius: 16,
      padding: "24px 22px",
    }}
  >
    <div style={{ fontSize: 34, fontWeight: 800, color: toneColor[step.tone] }}>{step.label}</div>
    <div style={{ fontSize: 28, lineHeight: 1.45, marginTop: 12, color: theme.text }}>{step.detail}</div>
  </div>
);

const Arrow = ({ startFrame }: { startFrame: number }) => (
  <div style={{ ...useFadeUp(startFrame), flex: "none", alignSelf: "center", fontSize: 44, color: theme.textMuted }}>
    →
  </div>
);

export const FlowSceneView = ({ scene, narrationFrames }: { scene: FlowScene; narrationFrames: number }) => (
  <div>
    <div style={{ ...useFadeUp(0), fontSize: 72, fontWeight: 800, marginBottom: 64 }}>{scene.heading}</div>
    <div style={{ display: "flex", gap: 18, alignItems: "stretch" }}>
      {scene.steps.map((step, index) => {
        const startFrame = revealFrame(index, scene.steps.length, narrationFrames);
        return [
          index > 0 ? <Arrow key={`arrow-${step.label}`} startFrame={startFrame} /> : null,
          <StepBox key={step.label} step={step} startFrame={startFrame} />,
        ];
      })}
    </div>
  </div>
);
