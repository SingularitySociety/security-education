import { AbsoluteFill } from "remotion";
import { theme } from "./theme.ts";

export type OgImageProps = { title: string; tagline: string };

export const OG_IMAGE_WIDTH_PX = 1200;
export const OG_IMAGE_HEIGHT_PX = 630;

const LONG_TITLE_CHARS = 18;

export const OgImage = ({ title, tagline }: OgImageProps) => (
  <AbsoluteFill
    lang="ja"
    style={{
      backgroundColor: theme.background,
      color: theme.text,
      fontFamily: theme.fontFamily,
      padding: "64px 80px",
      justifyContent: "space-between",
      wordBreak: "auto-phrase",
    }}
  >
    <div style={{ fontSize: 34, fontWeight: 700, color: theme.accent }}>セキュリティ教育</div>
    <div>
      <div style={{ fontSize: title.length > LONG_TITLE_CHARS ? 64 : 80, fontWeight: 800, lineHeight: 1.25 }}>
        {title}
      </div>
      <div style={{ marginTop: 28, fontSize: 36, color: theme.textMuted, lineHeight: 1.4 }}>{tagline}</div>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: theme.textMuted }}>
      <span>無料の動画と確認テスト</span>
      <span>Singularity Society</span>
    </div>
  </AbsoluteFill>
);
