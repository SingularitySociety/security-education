export type Narrated = {
  id: string;
  narration: string;
};

export type TitleScene = Narrated & {
  kind: "title";
  title: string;
  subtitle: string;
};

export type PointsScene = Narrated & {
  kind: "points";
  heading: string;
  points: string[];
};

export type EmailSample = {
  fromName: string;
  fromAddress: string;
  subject: string;
  body: string[];
} & ({ linkLabel: string; linkUrl: string } | { linkLabel?: never; linkUrl?: never });

export type RedFlag<Target extends string> = {
  target: Target;
  label: string;
};

export type EmailScene = Narrated & {
  kind: "email";
  email: EmailSample;
  redFlags: RedFlag<"from" | "subject" | "body" | "link">[];
};

export type SmsSample = {
  sender: string;
  text: string;
  linkUrl: string;
};

export type SmsScene = Narrated & {
  kind: "sms";
  sms: SmsSample;
  redFlags: RedFlag<"sender" | "text" | "link">[];
};

export type UrlPart = {
  text: string;
  isRegisteredDomain: boolean;
  isLookalike?: boolean;
};

export type UrlScene = Narrated & {
  kind: "url";
  heading: string;
  urls: { parts: UrlPart[]; verdict: "safe" | "fake"; note: string }[];
};

export type PasswordPart = {
  text: string;
  isPattern: boolean;
};

export type PasswordRow = {
  service: string;
  parts: PasswordPart[];
  status: "leaked" | "reused" | "guessed";
};

export type PasswordsScene = Narrated & {
  kind: "passwords";
  heading: string;
  rows: PasswordRow[];
};

export type ConversationMessage = {
  from: "them" | "me";
  text: string;
};

export type ConversationScene = Narrated & {
  kind: "conversation";
  channel: "phone" | "chat" | "video";
  contactName: string;
  contactDetail: string;
  messages: ConversationMessage[];
  redFlags: string[];
};

export type CodeLine = {
  text: string;
  mark?: "bad" | "good";
};

export type CodeScene = Narrated & {
  kind: "code";
  heading: string;
  language: string;
  lines: CodeLine[];
  notes: string[];
};

export type FlowStep = {
  label: string;
  detail: string;
  tone: "normal" | "danger" | "safe";
};

export type FlowScene = Narrated & {
  kind: "flow";
  heading: string;
  steps: FlowStep[];
};

export type Scene =
  | TitleScene
  | PointsScene
  | EmailScene
  | SmsScene
  | UrlScene
  | PasswordsScene
  | ConversationScene
  | CodeScene
  | FlowScene;

export type Choice = {
  id: string;
  label: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  sample?: { kind: "email"; email: EmailSample } | { kind: "sms"; sms: SmsSample };
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
};

export type Course = {
  id: string;
  title: string;
  summary: string;
  scenes: Scene[];
  questionPool: QuizQuestion[];
};
