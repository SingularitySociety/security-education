import type { UrlScene } from "@security-education/course";
import { theme } from "../theme.ts";
import { revealFrame } from "../reveal.ts";
import { useFadeUp } from "./motion.ts";

type UrlRow = UrlScene["urls"][number];

const verdictLabel = { safe: "公式", fake: "偽物" } as const;

const UrlRowView = ({ row, startFrame }: { row: UrlRow; startFrame: number }) => {
  const verdictColor = row.verdict === "safe" ? theme.safe : theme.danger;
  return (
    <div style={{ ...useFadeUp(startFrame), backgroundColor: theme.surface, borderRadius: 20, padding: "28px 36px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <div
          style={{
            flex: "none",
            backgroundColor: verdictColor,
            borderRadius: 12,
            padding: "8px 20px",
            fontSize: 32,
            fontWeight: 800,
          }}
        >
          {verdictLabel[row.verdict]}
        </div>
        <div style={{ fontFamily: "Menlo, monospace", fontSize: 40 }}>
          {row.parts.map((part) => (
            <span
              key={part.text}
              style={
                part.isRegisteredDomain
                  ? { color: verdictColor, fontWeight: 800, textDecoration: "underline" }
                  : { color: theme.textMuted }
              }
            >
              {part.text}
            </span>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 12, fontSize: 32, color: theme.textMuted }}>{row.note}</div>
    </div>
  );
};

export const UrlSceneView = ({ scene, narrationFrames }: { scene: UrlScene; narrationFrames: number }) => (
  <div>
    <div style={{ ...useFadeUp(0), fontSize: 76, fontWeight: 800, marginBottom: 56 }}>{scene.heading}</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {scene.urls.map((row, index) => (
        <UrlRowView
          key={row.parts.map((part) => part.text).join("")}
          row={row}
          startFrame={revealFrame(index + 1, scene.urls.length + 1, narrationFrames)}
        />
      ))}
    </div>
  </div>
);
