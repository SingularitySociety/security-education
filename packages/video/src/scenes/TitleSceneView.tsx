import type { TitleScene } from "@security-education/course";
import { theme } from "../theme.ts";
import { useFadeUp } from "./motion.ts";

const SUBTITLE_DELAY_FRAMES = 15;

export const TitleSceneView = ({ scene }: { scene: TitleScene }) => {
  const titleStyle = useFadeUp(0);
  const subtitleStyle = useFadeUp(SUBTITLE_DELAY_FRAMES);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ ...titleStyle, fontSize: 120, fontWeight: 800 }}>{scene.title}</div>
      <div style={{ ...subtitleStyle, marginTop: 40, fontSize: 52, color: theme.accent }}>{scene.subtitle}</div>
    </div>
  );
};
