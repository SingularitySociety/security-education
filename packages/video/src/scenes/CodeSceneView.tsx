import type { CodeLine, CodeScene } from "@security-education/course";
import { theme } from "../theme.ts";
import { revealFrame } from "../reveal.ts";
import { useFadeUp, useIsShown } from "./motion.ts";

const CODE_FONT_SIZE_PX = 26;

const markStyle = {
  bad: { backgroundColor: "rgba(244, 63, 94, 0.22)", borderLeft: `6px solid ${theme.danger}` },
  good: { backgroundColor: "rgba(34, 197, 94, 0.2)", borderLeft: `6px solid ${theme.safe}` },
} as const;

const CodeLineView = ({ line, markFrame }: { line: CodeLine; markFrame: number }) => {
  const marked = useIsShown(markFrame) && line.mark !== undefined;
  return (
    <div
      style={{
        whiteSpace: "pre",
        padding: "2px 16px",
        borderLeft: "6px solid transparent",
        ...(marked && line.mark ? markStyle[line.mark] : {}),
      }}
    >
      {line.text === "" ? " " : line.text}
    </div>
  );
};

const NoteRow = ({ text, startFrame }: { text: string; startFrame: number }) => (
  <div style={{ ...useFadeUp(startFrame), fontSize: 36, lineHeight: 1.4, display: "flex", gap: 16 }}>
    <span style={{ color: theme.accent, fontWeight: 800 }}>▶</span>
    <span>{text}</span>
  </div>
);

export const CodeSceneView = ({ scene, narrationFrames }: { scene: CodeScene; narrationFrames: number }) => {
  const markFrame = revealFrame(0, scene.notes.length + 1, narrationFrames);
  return (
    <div>
      <div style={{ ...useFadeUp(0), fontSize: 64, fontWeight: 800, marginBottom: 40 }}>{scene.heading}</div>
      <div style={{ display: "flex", gap: 56, alignItems: "flex-start" }}>
        <div
          style={{
            ...useFadeUp(0),
            flex: 2,
            backgroundColor: theme.surface,
            borderRadius: 20,
            padding: "20px 0",
            fontFamily: "Menlo, monospace",
            fontSize: CODE_FONT_SIZE_PX,
            lineHeight: 1.5,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "0 22px 12px", fontSize: 24, color: theme.textMuted }}>{scene.language}</div>
          {scene.lines.map((line, index) => (
            <CodeLineView key={`${index}-${line.text}`} line={line} markFrame={markFrame} />
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 28 }}>
          {scene.notes.map((note, index) => (
            <NoteRow
              key={note}
              text={note}
              startFrame={revealFrame(index + 1, scene.notes.length + 1, narrationFrames)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
