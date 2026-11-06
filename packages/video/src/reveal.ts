import { SCENE_LEAD_IN_FRAMES } from "./voice.ts";

const FIRST_REVEAL_SHARE = 0.12;
const LAST_REVEAL_SHARE = 0.8;

export const revealFrame = (index: number, count: number, narrationFrames: number): number => {
  if (count <= 1) return SCENE_LEAD_IN_FRAMES;
  const share = FIRST_REVEAL_SHARE + ((LAST_REVEAL_SHARE - FIRST_REVEAL_SHARE) * index) / (count - 1);
  return SCENE_LEAD_IN_FRAMES + Math.round(narrationFrames * share);
};
