import type { UrlPart, UrlScene } from "@security-education/course";
import { theme } from "../theme.ts";
import { revealFrame } from "../reveal.ts";
import { useFadeUp } from "./motion.ts";

type UrlRow = UrlScene["urls"][number];

const verdictLabel = { safe: "公式", fake: "偽物" } as const;

const partStyle = (part: UrlPart, verdictColor: string) => {
  if (!part.isRegisteredDomain) return { color: theme.textMuted };
  const domainStyle = { color: verdictColor, fontWeight: 800, textDecoration: "underline" };
  return part.isLookalike
    ? { ...domainStyle, color: theme.text, backgroundColor: theme.danger, borderRadius: 6 }
    : domainStyle;
};

const COMPACT_ROW_THRESHOLD = 3;

const layoutFor = (rowCount: number) =>
  rowCount > COMPACT_ROW_THRESHOLD
    ? { rowPadding: "18px 32px", rowGap: 20, headingMargin: 36 }
    : { rowPadding: "28px 36px", rowGap: 32, headingMargin: 56 };

const UrlRowView = ({ row, startFrame, padding }: { row: UrlRow; startFrame: number; padding: string }) => {
  const verdictColor = row.verdict === "safe" ? theme.safe : theme.danger;
  return (
    <div style={{ ...useFadeUp(startFrame), backgroundColor: theme.surface, borderRadius: 20, padding }}>
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
          {row.parts.map((part, index) => (
            <span key={`${index}-${part.text}`} style={partStyle(part, verdictColor)}>
              {part.text}
            </span>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 12, fontSize: 32, color: theme.textMuted }}>{row.note}</div>
    </div>
  );
};

export const UrlSceneView = ({ scene, narrationFrames }: { scene: UrlScene; narrationFrames: number }) => {
  const layout = layoutFor(scene.urls.length);
  return (
    <div>
      <div style={{ ...useFadeUp(0), fontSize: 76, fontWeight: 800, marginBottom: layout.headingMargin }}>
        {scene.heading}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: layout.rowGap }}>
        {scene.urls.map((row, index) => (
          <UrlRowView
            key={row.parts.map((part) => part.text).join("")}
            row={row}
            padding={layout.rowPadding}
            startFrame={revealFrame(index + 1, scene.urls.length + 1, narrationFrames)}
          />
        ))}
      </div>
    </div>
  );
};
