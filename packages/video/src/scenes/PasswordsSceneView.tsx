import type { PasswordRow, PasswordsScene } from "@security-education/course";
import { theme } from "../theme.ts";
import { revealFrame } from "../reveal.ts";
import { useFadeUp } from "./motion.ts";

const statusStyle = {
  leaked: { label: "漏えい", color: theme.danger },
  reused: { label: "同じパスワードで突破", color: theme.warning },
  guessed: { label: "推測で突破", color: theme.warning },
} as const;

const PasswordRowView = ({ row, startFrame }: { row: PasswordRow; startFrame: number }) => {
  const status = statusStyle[row.status];
  return (
    <div
      style={{
        ...useFadeUp(startFrame),
        display: "flex",
        alignItems: "center",
        gap: 32,
        backgroundColor: theme.surface,
        borderRadius: 20,
        padding: "28px 36px",
      }}
    >
      <div style={{ width: 360, flex: "none", fontSize: 38, fontWeight: 700 }}>{row.service}</div>
      <div style={{ flex: 1, fontFamily: "Menlo, monospace", fontSize: 44 }}>
        {row.parts.map((part, index) => (
          <span
            key={`${index}-${part.text}`}
            style={part.isPattern ? { color: theme.accent, fontWeight: 800, textDecoration: "underline" } : {}}
          >
            {part.text}
          </span>
        ))}
      </div>
      <div
        style={{
          flex: "none",
          backgroundColor: status.color,
          borderRadius: 12,
          padding: "8px 20px",
          fontSize: 30,
          fontWeight: 800,
        }}
      >
        {status.label}
      </div>
    </div>
  );
};

export const PasswordsSceneView = ({ scene, narrationFrames }: { scene: PasswordsScene; narrationFrames: number }) => (
  <div>
    <div style={{ ...useFadeUp(0), fontSize: 76, fontWeight: 800, marginBottom: 56 }}>{scene.heading}</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {scene.rows.map((row, index) => (
        <PasswordRowView
          key={row.service}
          row={row}
          startFrame={revealFrame(index + 1, scene.rows.length + 1, narrationFrames)}
        />
      ))}
    </div>
  </div>
);
