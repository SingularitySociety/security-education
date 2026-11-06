import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  CONVERSATION_EXAMPLE_HEADINGS,
  courses,
  draftCourses,
  EMAIL_EXAMPLE_HEADING,
  SMS_EXAMPLE_HEADING,
  toReviewSection,
  toReviewSections,
} from "../packages/course/src/index.ts";
import type {
  CodeLine,
  ConversationMessage,
  ConversationScene,
  EmailSample,
  FlowStep,
  ReviewBody,
  Scene,
} from "../packages/course/src/index.ts";

const email: EmailSample = {
  fromName: "サンプル銀行",
  fromAddress: "info@bank.example",
  subject: "至急",
  body: ["本文"],
  linkLabel: "ログイン",
  linkUrl: "https://bank.example/login",
};

describe("toReviewSection", () => {
  it("title: heading is the title, body is the subtitle", () => {
    const scene: Scene = { id: "t", kind: "title", title: "題", subtitle: "副題", narration: "n" };
    assert.deepEqual(toReviewSection(scene), {
      sceneId: "t",
      heading: "題",
      narration: "n",
      body: { kind: "subtitle", text: "副題" },
    });
  });

  it("points: keeps every point in order and does not share the source array", () => {
    const points = ["一", "二"];
    const section = toReviewSection({ id: "p", kind: "points", heading: "要点", points, narration: "n" });
    assert.equal(section.heading, "要点");
    assert.deepEqual(section.body, { kind: "points", points: ["一", "二"] });
    assert.ok(section.body.kind === "points" && section.body.points !== points);
  });

  it("points: an empty list stays empty", () => {
    const section = toReviewSection({ id: "p", kind: "points", heading: "h", points: [], narration: "n" });
    assert.deepEqual(section.body, { kind: "points", points: [] });
  });

  it("email: shows the sample and the red-flag labels", () => {
    const section = toReviewSection({
      id: "e",
      kind: "email",
      email,
      redFlags: [
        { target: "from", label: "差出人が違う" },
        { target: "link", label: "リンク先が違う" },
      ],
      narration: "n",
    });
    assert.equal(section.heading, EMAIL_EXAMPLE_HEADING);
    assert.deepEqual(section.body, { kind: "email", email, redFlags: ["差出人が違う", "リンク先が違う"] });
  });

  it("sms: shows the sample and the red-flag labels, even when there are none", () => {
    const sms = { sender: "+81", text: "荷物", linkUrl: "https://x.example" };
    const section = toReviewSection({ id: "s", kind: "sms", sms, redFlags: [], narration: "n" });
    assert.equal(section.heading, SMS_EXAMPLE_HEADING);
    assert.deepEqual(section.body, { kind: "sms", sms, redFlags: [] });
  });

  it("url: joins the parts and labels each verdict", () => {
    const section = toReviewSection({
      id: "u",
      kind: "url",
      heading: "右から読む",
      urls: [
        {
          parts: [
            { text: "https://", isRegisteredDomain: false },
            { text: "bank.example", isRegisteredDomain: true },
          ],
          verdict: "safe",
          note: "公式",
        },
        { parts: [{ text: "https://bank.evil.example", isRegisteredDomain: true }], verdict: "fake", note: "偽" },
      ],
      narration: "n",
    });
    assert.deepEqual(section.body, {
      kind: "urls",
      urls: [
        { url: "https://bank.example", isFake: false, verdictLabel: "公式", note: "公式" },
        { url: "https://bank.evil.example", isFake: true, verdictLabel: "偽物", note: "偽" },
      ],
    });
  });

  it("url: a row with no parts becomes an empty URL", () => {
    const section = toReviewSection({
      id: "u",
      kind: "url",
      heading: "h",
      urls: [{ parts: [], verdict: "fake", note: "" }],
      narration: "n",
    });
    assert.deepEqual(section.body, {
      kind: "urls",
      urls: [{ url: "", isFake: true, verdictLabel: "偽物", note: "" }],
    });
  });

  it("passwords: joins the parts and labels every status", () => {
    const section = toReviewSection({
      id: "pw",
      kind: "passwords",
      heading: "使い回し",
      rows: [
        {
          service: "A",
          parts: [
            { text: "Hanako", isPattern: true },
            { text: "shop", isPattern: false },
          ],
          status: "leaked",
        },
        { service: "B", parts: [{ text: "x", isPattern: true }], status: "reused" },
        { service: "C", parts: [], status: "guessed" },
      ],
      narration: "n",
    });
    assert.deepEqual(section.body, {
      kind: "passwords",
      rows: [
        { service: "A", password: "Hanakoshop", statusLabel: "漏えい" },
        { service: "B", password: "x", statusLabel: "同じパスワードで突破" },
        { service: "C", password: "", statusLabel: "推測で突破" },
      ],
    });
  });
});

const listItemKeys = (body: ReviewBody): string[] => {
  switch (body.kind) {
    case "points":
      return body.points;
    case "email":
    case "sms":
    case "conversation":
      return body.redFlags;
    case "code":
      return body.notes;
    case "flow":
      return body.steps.map((step) => step.label);
    case "urls":
      return body.urls.map((row) => row.url);
    case "passwords":
      return body.rows.map((row) => row.service);
    case "subtitle":
      return [];
  }
};

describe("toReviewSection for conversations", () => {
  it("uses a heading per channel and keeps messages and red flags in order", () => {
    const messages: ConversationMessage[] = [
      { from: "them", text: "こちら警察です" },
      { from: "me", text: "えっ" },
    ];
    const channels: ConversationScene["channel"][] = ["phone", "chat", "video"];
    channels.forEach((channel) => {
      const section = toReviewSection({
        id: "c",
        kind: "conversation",
        channel,
        contactName: "相手",
        contactDetail: "説明",
        messages,
        redFlags: ["急がせる"],
        narration: "n",
      });
      assert.equal(section.heading, CONVERSATION_EXAMPLE_HEADINGS[channel]);
      assert.deepEqual(section.body, {
        kind: "conversation",
        contactName: "相手",
        contactDetail: "説明",
        messages,
        redFlags: ["急がせる"],
      });
    });
  });

  it("an empty conversation stays empty", () => {
    const section = toReviewSection({
      id: "c",
      kind: "conversation",
      channel: "chat",
      contactName: "",
      contactDetail: "",
      messages: [],
      redFlags: [],
      narration: "",
    });
    assert.deepEqual(section.body, {
      kind: "conversation",
      contactName: "",
      contactDetail: "",
      messages: [],
      redFlags: [],
    });
  });
});

describe("toReviewSection for code and flow scenes", () => {
  it("code: keeps language, every line with its mark, and the notes", () => {
    const lines: CodeLine[] = [
      { text: "query(input)", mark: "bad" },
      { text: "" },
      { text: "query(?, input)", mark: "good" },
    ];
    const section = toReviewSection({
      id: "c",
      kind: "code",
      heading: "危ない書き方",
      language: "JavaScript",
      lines,
      notes: ["入力をそのまま使わない"],
      narration: "n",
    });
    assert.equal(section.heading, "危ない書き方");
    assert.deepEqual(section.body, { kind: "code", language: "JavaScript", lines, notes: ["入力をそのまま使わない"] });
  });

  it("code and flow: empty lists stay empty", () => {
    const code = toReviewSection({
      id: "c",
      kind: "code",
      heading: "",
      language: "",
      lines: [],
      notes: [],
      narration: "",
    });
    const flow = toReviewSection({ id: "f", kind: "flow", heading: "", steps: [], narration: "" });
    assert.deepEqual(code.body, { kind: "code", language: "", lines: [], notes: [] });
    assert.deepEqual(flow.body, { kind: "flow", steps: [] });
  });

  it("flow: keeps every step in order with its tone", () => {
    const steps: FlowStep[] = [
      { label: "侵入", detail: "弱いパスワード", tone: "danger" },
      { label: "検知", detail: "アラート", tone: "safe" },
    ];
    const section = toReviewSection({ id: "f", kind: "flow", heading: "流れ", steps, narration: "n" });
    assert.deepEqual(section.body, { kind: "flow", steps });
  });
});

describe("toReviewSection for an email without a link", () => {
  it("keeps the email as is", () => {
    const withoutLink: EmailSample = {
      fromName: "社長",
      fromAddress: "ceo@x.example",
      subject: "至急",
      body: ["返信して"],
    };
    const section = toReviewSection({ id: "e", kind: "email", email: withoutLink, redFlags: [], narration: "n" });
    assert.deepEqual(section.body, { kind: "email", email: withoutLink, redFlags: [] });
  });
});

describe("toReviewSections", () => {
  it("an empty scene list gives no sections", () => {
    assert.deepEqual(toReviewSections([]), []);
  });

  [...courses, ...draftCourses].forEach((course) => {
    it(`${course.id}: every scene converts, in order, with a heading and its narration`, () => {
      const sections = toReviewSections(course.scenes);
      assert.deepEqual(
        sections.map((section) => section.sceneId),
        course.scenes.map((scene) => scene.id),
      );
      sections.forEach((section, index) => {
        assert.ok(section.heading.trim().length > 0, section.sceneId);
        assert.equal(section.narration, course.scenes[index]?.narration);
      });
    });

    it(`${course.id}: every URL and password row gets a label`, () => {
      toReviewSections(course.scenes).forEach(({ body }) => {
        if (body.kind === "urls") body.urls.forEach((row) => assert.ok(row.url && row.verdictLabel));
        if (body.kind === "passwords") body.rows.forEach((row) => assert.ok(row.password && row.statusLabel));
      });
    });

    it(`${course.id}: list items within a section are unique, so they can be used as keys`, () => {
      toReviewSections(course.scenes).forEach(({ sceneId, body }) => {
        const itemKeys = listItemKeys(body);
        assert.equal(new Set(itemKeys).size, itemKeys.length, sceneId);
      });
    });
  });
});
