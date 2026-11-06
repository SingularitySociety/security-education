import type { SmsScene } from "@security-education/course";
import { theme } from "../theme.ts";
import { useFadeUp } from "./motion.ts";
import { Highlight, RedFlagList, redFlagStartFrames } from "./RedFlags.tsx";

const PHONE_WIDTH_PX = 560;

export const SmsSceneView = ({ scene, narrationFrames }: { scene: SmsScene; narrationFrames: number }) => {
  const { sms } = scene;
  const startFrames = redFlagStartFrames(scene.redFlags, narrationFrames);
  return (
    <div style={{ display: "flex", gap: 96, alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          ...useFadeUp(0),
          width: PHONE_WIDTH_PX,
          height: 820,
          borderRadius: 64,
          border: `14px solid ${theme.surfaceRaised}`,
          backgroundColor: "#f3f4f6",
          color: theme.paperText,
          padding: "40px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <Highlight startFrame={startFrames.get("sender")}>
          <div style={{ textAlign: "center", fontSize: 30, fontWeight: 700, padding: 8 }}>{sms.sender}</div>
        </Highlight>
        <Highlight startFrame={startFrames.get("text")}>
          <div style={{ backgroundColor: "#e5e7eb", borderRadius: 28, padding: 28, fontSize: 30, lineHeight: 1.5 }}>
            {sms.text}
          </div>
        </Highlight>
        <Highlight startFrame={startFrames.get("link")}>
          <div
            style={{ fontSize: 28, color: "#2563eb", textDecoration: "underline", padding: 8, wordBreak: "break-all" }}
          >
            {sms.linkUrl}
          </div>
        </Highlight>
      </div>
      <div style={{ flex: 1, maxWidth: 820 }}>
        <RedFlagList redFlags={scene.redFlags} startFrames={startFrames} />
      </div>
    </div>
  );
};
