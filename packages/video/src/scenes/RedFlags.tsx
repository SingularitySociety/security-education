import type { ReactNode } from "react";
import { CONVERSATION_NOTES_HEADINGS, type RedFlag } from "@security-education/course";
import { theme } from "../theme.ts";
import { revealFrame } from "../reveal.ts";
import { useFadeUp, useIsShown } from "./motion.ts";

const HIGHLIGHT_OUTLINE_PX = 6;

export const redFlagStartFrames = <Target extends string>(
  redFlags: readonly RedFlag<Target>[],
  narrationFrames: number,
): Map<Target, number> =>
  new Map(redFlags.map((flag, index) => [flag.target, revealFrame(index, redFlags.length, narrationFrames)]));

export const Highlight = ({ startFrame, children }: { startFrame: number | undefined; children: ReactNode }) => {
  const shown = useIsShown(startFrame ?? Number.POSITIVE_INFINITY);
  return (
    <div
      style={{
        borderRadius: 12,
        outline: shown ? `${HIGHLIGHT_OUTLINE_PX}px solid ${theme.danger}` : "none",
        outlineOffset: 6,
        backgroundColor: shown ? "rgba(244, 63, 94, 0.12)" : "transparent",
      }}
    >
      {children}
    </div>
  );
};

const RedFlagItem = ({
  label,
  number,
  startFrame,
  color,
}: {
  label: string;
  number: number;
  startFrame: number;
  color: string;
}) => (
  <div style={{ ...useFadeUp(startFrame), display: "flex", gap: 20, alignItems: "flex-start" }}>
    <div
      style={{
        flex: "none",
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: color,
        fontSize: 32,
        fontWeight: 800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {number}
    </div>
    <div style={{ fontSize: 40, lineHeight: 1.4 }}>{label}</div>
  </div>
);

export const RedFlagList = <Target extends string>({
  redFlags,
  startFrames,
  heading = CONVERSATION_NOTES_HEADINGS.redFlags,
  color = theme.danger,
}: {
  redFlags: readonly RedFlag<Target>[];
  startFrames: Map<Target, number>;
  heading?: string;
  color?: string;
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
    <div style={{ fontSize: 48, fontWeight: 800, color }}>{heading}</div>
    {redFlags.map((flag, index) => (
      <RedFlagItem
        key={flag.target}
        label={flag.label}
        number={index + 1}
        startFrame={startFrames.get(flag.target) ?? 0}
        color={color}
      />
    ))}
  </div>
);
