import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  courses,
  draftCourses,
  isQuizComplete,
  scoreQuiz,
  toScorePercent,
  PASS_THRESHOLD_PERCENT,
} from "../packages/course/src/index.ts";
import type { Answers, QuizQuestion } from "../packages/course/src/index.ts";

const allCorrect = (quiz: readonly QuizQuestion[]): Answers =>
  Object.fromEntries(quiz.map((question) => [question.id, question.correctChoiceId]));

const wrongChoiceOf = (question: QuizQuestion): string => {
  const wrong = question.choices.find((choice) => choice.id !== question.correctChoiceId);
  assert.ok(wrong, `question ${question.id} needs a wrong choice`);
  return wrong.id;
};

describe("course data", () => {
  [...courses, ...draftCourses].forEach((course) => {
    it(`${course.id}: every correctChoiceId points at an existing choice`, () => {
      course.questionPool.forEach((question) => {
        assert.ok(
          question.choices.some((choice) => choice.id === question.correctChoiceId),
          question.id,
        );
      });
    });
    it(`${course.id}: ids are unique`, () => {
      const questionIds = course.questionPool.map((question) => question.id);
      const sceneIds = course.scenes.map((scene) => scene.id);
      assert.equal(new Set(questionIds).size, questionIds.length);
      assert.equal(new Set(sceneIds).size, sceneIds.length);
    });
    it(`${course.id}: every scene has narration`, () => {
      course.scenes.forEach((scene) => assert.ok(scene.narration.trim().length > 0, scene.id));
    });
  });
});

describe("scoreQuiz", () => {
  const quiz = courses[0]?.questionPool ?? [];

  it("all correct passes with 100%", () => {
    const result = scoreQuiz(quiz, allCorrect(quiz));
    assert.equal(result.correctCount, quiz.length);
    assert.equal(result.scorePercent, 100);
    assert.equal(result.passed, true);
  });

  it("no answers fails with 0% and null choices", () => {
    const result = scoreQuiz(quiz, {});
    assert.equal(result.correctCount, 0);
    assert.equal(result.passed, false);
    assert.ok(result.questionResults.every((questionResult) => questionResult.chosenChoiceId === null));
  });

  it("pass/fail flips exactly at the threshold for every wrong-count", () => {
    quiz.forEach((_, wrongCount) => {
      const answers = Object.fromEntries(
        quiz.map((question, index) => [
          question.id,
          index < wrongCount ? wrongChoiceOf(question) : question.correctChoiceId,
        ]),
      );
      const result = scoreQuiz(quiz, answers);
      assert.equal(result.correctCount, quiz.length - wrongCount);
      assert.equal(result.passed, result.scorePercent >= PASS_THRESHOLD_PERCENT);
    });
  });

  it("ignores answers to unknown questions and unknown choice ids", () => {
    const result = scoreQuiz(quiz, { unknown: "a", [quiz[0]?.id ?? ""]: "zzz" });
    assert.equal(result.correctCount, 0);
  });

  it("an empty quiz never passes", () => {
    const result = scoreQuiz([], {});
    assert.deepEqual([result.total, result.scorePercent, result.passed], [0, 0, false]);
  });
});

describe("toScorePercent", () => {
  it("rounds and guards zero total", () => {
    assert.equal(toScorePercent(2, 3), 67);
    assert.equal(toScorePercent(0, 0), 0);
    assert.equal(toScorePercent(4, 5), 80);
  });
});

describe("isQuizComplete", () => {
  const quiz = courses[1]?.questionPool ?? [];
  it("is true only when every question has an answer", () => {
    const answers = allCorrect(quiz);
    assert.equal(isQuizComplete(quiz, answers), true);
    const firstId = quiz[0]?.id ?? "";
    const partial = Object.fromEntries(Object.entries(answers).filter(([id]) => id !== firstId));
    assert.equal(isQuizComplete(quiz, partial), false);
    assert.equal(isQuizComplete(quiz, {}), false);
  });
});
