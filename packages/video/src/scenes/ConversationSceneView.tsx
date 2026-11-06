import type { ConversationMessage, ConversationScene } from "@security-education/course";
import { theme } from "../theme.ts";
import { revealFrame } from "../reveal.ts";
import { useFadeUp } from "./motion.ts";
import { RedFlagList, redFlagStartFrames } from "./RedFlags.tsx";

const PHONE_WIDTH_PX = 640;
const PHONE_HEIGHT_PX = 780;

const channelLabel = { phone: "通話中", chat: "チャット", video: "ビデオ通話" } as const;

const bubbleStyle = {
  them: { alignSelf: "flex-start", backgroundColor: "#e5e7eb", color: theme.paperText },
  me: { alignSelf: "flex-end", backgroundColor: "#2563eb", color: "#ffffff" },
} as const;

const MessageBubble = ({ message, startFrame }: { message: ConversationMessage; startFrame: number }) => (
  <div
    style={{
      ...useFadeUp(startFrame),
      ...bubbleStyle[message.from],
      maxWidth: "85%",
      borderRadius: 24,
      padding: "12px 18px",
      fontSize: 25,
      lineHeight: 1.4,
    }}
  >
    {message.text}
  </div>
);

const ContactHeader = ({ scene }: { scene: ConversationScene }) => (
  <div style={{ textAlign: "center", borderBottom: "2px solid #d1d5db", paddingBottom: 12 }}>
    <div style={{ fontSize: 24, color: "#6b7280" }}>{channelLabel[scene.channel]}</div>
    <div style={{ fontSize: 30, fontWeight: 800, marginTop: 2 }}>{scene.contactName}</div>
    <div style={{ fontSize: 24, color: "#6b7280", marginTop: 4 }}>{scene.contactDetail}</div>
  </div>
);

export const ConversationSceneView = ({
  scene,
  narrationFrames,
}: {
  scene: ConversationScene;
  narrationFrames: number;
}) => {
  const redFlags = scene.redFlags.map((label, index) => ({ target: `flag-${index}`, label }));
  const flagStartFrames = redFlagStartFrames(redFlags, narrationFrames);
  return (
    <div style={{ display: "flex", gap: 80, alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          ...useFadeUp(0),
          flex: "none",
          width: PHONE_WIDTH_PX,
          height: PHONE_HEIGHT_PX,
          borderRadius: 64,
          border: `14px solid ${theme.surfaceRaised}`,
          backgroundColor: "#f9fafb",
          color: theme.paperText,
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          overflow: "hidden",
        }}
      >
        <ContactHeader scene={scene} />
        {scene.messages.map((message, index) => (
          <MessageBubble
            key={`${index}-${message.text}`}
            message={message}
            startFrame={revealFrame(index, scene.messages.length, narrationFrames)}
          />
        ))}
      </div>
      <div style={{ flex: 1, maxWidth: 860 }}>
        <RedFlagList redFlags={redFlags} startFrames={flagStartFrames} />
      </div>
    </div>
  );
};
