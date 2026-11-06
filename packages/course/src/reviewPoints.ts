import type { EmailSample, PasswordRow, Scene, SmsSample, UrlScene } from "./types.ts";

export type ReviewUrl = {
  url: string;
  isFake: boolean;
  verdictLabel: string;
  note: string;
};

export type ReviewPassword = {
  service: string;
  password: string;
  statusLabel: string;
};

export type ReviewBody =
  | { kind: "subtitle"; text: string }
  | { kind: "points"; points: string[] }
  | { kind: "email"; email: EmailSample; redFlags: string[] }
  | { kind: "sms"; sms: SmsSample; redFlags: string[] }
  | { kind: "urls"; urls: ReviewUrl[] }
  | { kind: "passwords"; rows: ReviewPassword[] };

export type ReviewSection = {
  sceneId: string;
  heading: string;
  narration: string;
  body: ReviewBody;
};

export const EMAIL_EXAMPLE_HEADING = "例：届いたメール";
export const SMS_EXAMPLE_HEADING = "例：届いたSMS";

const VERDICT_LABELS: Record<UrlScene["urls"][number]["verdict"], string> = { safe: "公式", fake: "偽物" };

const PASSWORD_STATUS_LABELS: Record<PasswordRow["status"], string> = {
  leaked: "漏えい",
  reused: "同じパスワードで突破",
  guessed: "推測で突破",
};

const toReviewUrl = (row: UrlScene["urls"][number]): ReviewUrl => ({
  url: row.parts.map((part) => part.text).join(""),
  isFake: row.verdict === "fake",
  verdictLabel: VERDICT_LABELS[row.verdict],
  note: row.note,
});

const toReviewPassword = (row: PasswordRow): ReviewPassword => ({
  service: row.service,
  password: row.parts.map((part) => part.text).join(""),
  statusLabel: PASSWORD_STATUS_LABELS[row.status],
});

const flagLabels = (scene: { redFlags: readonly { label: string }[] }): string[] =>
  scene.redFlags.map((flag) => flag.label);

const assertNever = (value: never): never => {
  throw new Error(`Unknown scene kind: ${JSON.stringify(value)}`);
};

const headingAndBody = (scene: Scene): Pick<ReviewSection, "heading" | "body"> => {
  switch (scene.kind) {
    case "title":
      return { heading: scene.title, body: { kind: "subtitle", text: scene.subtitle } };
    case "points":
      return { heading: scene.heading, body: { kind: "points", points: [...scene.points] } };
    case "email":
      return {
        heading: EMAIL_EXAMPLE_HEADING,
        body: { kind: "email", email: scene.email, redFlags: flagLabels(scene) },
      };
    case "sms":
      return { heading: SMS_EXAMPLE_HEADING, body: { kind: "sms", sms: scene.sms, redFlags: flagLabels(scene) } };
    case "url":
      return { heading: scene.heading, body: { kind: "urls", urls: scene.urls.map(toReviewUrl) } };
    case "passwords":
      return { heading: scene.heading, body: { kind: "passwords", rows: scene.rows.map(toReviewPassword) } };
    default:
      return assertNever(scene);
  }
};

export const toReviewSection = (scene: Scene): ReviewSection => ({
  sceneId: scene.id,
  narration: scene.narration,
  ...headingAndBody(scene),
});

export const toReviewSections = (scenes: readonly Scene[]): ReviewSection[] => scenes.map(toReviewSection);
