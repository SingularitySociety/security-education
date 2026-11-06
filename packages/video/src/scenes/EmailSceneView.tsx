import type { EmailScene } from "@security-education/course";
import { theme } from "../theme.ts";
import { useFadeUp } from "./motion.ts";
import { Highlight, RedFlagList, redFlagStartFrames } from "./RedFlags.tsx";

export const EmailSceneView = ({ scene, narrationFrames }: { scene: EmailScene; narrationFrames: number }) => {
  const { email } = scene;
  const startFrames = redFlagStartFrames(scene.redFlags, narrationFrames);
  return (
    <div style={{ display: "flex", gap: 72, alignItems: "center" }}>
      <div
        style={{
          ...useFadeUp(0),
          flex: 3,
          backgroundColor: theme.paper,
          color: theme.paperText,
          borderRadius: 24,
          padding: 48,
          display: "flex",
          flexDirection: "column",
          gap: 28,
          fontSize: 32,
        }}
      >
        <Highlight startFrame={startFrames.get("from")}>
          <div style={{ fontWeight: 700 }}>{email.fromName}</div>
          <div style={{ color: "#6b7280" }}>&lt;{email.fromAddress}&gt;</div>
        </Highlight>
        <Highlight startFrame={startFrames.get("subject")}>
          <div style={{ fontSize: 40, fontWeight: 800 }}>{email.subject}</div>
        </Highlight>
        <Highlight startFrame={startFrames.get("body")}>
          {email.body.map((line) => (
            <p key={line} style={{ margin: "8px 0", lineHeight: 1.5 }}>
              {line}
            </p>
          ))}
        </Highlight>
        <Highlight startFrame={startFrames.get("link")}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
            <div
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                padding: "16px 36px",
                borderRadius: 12,
                fontWeight: 700,
              }}
            >
              {email.linkLabel}
            </div>
            <div style={{ fontSize: 24, color: "#6b7280" }}>{email.linkUrl}</div>
          </div>
        </Highlight>
      </div>
      <div style={{ flex: 2 }}>
        <RedFlagList redFlags={scene.redFlags} startFrames={startFrames} />
      </div>
    </div>
  );
};
