import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { courses, drawQuiz, shuffled, QUIZ_QUESTION_COUNT } from "../packages/course/src/index.ts";
import type { QuizQuestion, RandomSource } from "../packages/course/src/index.ts";

const POOL_SIZE_PER_DRAW = 3;
const DRAW_COUNT = 300;
const LCG_MULTIPLIER = 1664525;
const LCG_INCREMENT = 1013904223;
const LCG_MODULUS = 2 ** 32;

const seededRandom = (seed: number): RandomSource => {
  const state = { value: seed };
  return () => {
    state.value = (state.value * LCG_MULTIPLIER + LCG_INCREMENT) % LCG_MODULUS;
    return state.value / LCG_MODULUS;
  };
};

const sortedIds = (items: readonly { id: string }[]): string[] => items.map((item) => item.id).sort();

const drawMany = (pool: readonly QuizQuestion[], seed: number): QuizQuestion[][] => {
  const random = seededRandom(seed);
  return Array.from({ length: DRAW_COUNT }, () => drawQuiz(pool, QUIZ_QUESTION_COUNT, random));
};

describe("shuffled", () => {
  it("keeps every item exactly once and does not mutate the input", () => {
    const items = ["a", "b", "c", "d", "e"];
    const result = shuffled(items, seededRandom(1));
    assert.deepEqual([...result].sort(), items);
    assert.deepEqual(items, ["a", "b", "c", "d", "e"]);
  });

  it("handles empty and single-item lists", () => {
    assert.deepEqual(shuffled([], Math.random), []);
    assert.deepEqual(shuffled(["only"], Math.random), ["only"]);
  });

  it("is deterministic for a given random source", () => {
    const items = Array.from({ length: 10 }, (_, index) => index);
    assert.deepEqual(shuffled(items, seededRandom(7)), shuffled(items, seededRandom(7)));
  });
});

describe("drawQuiz", () => {
  courses.forEach((course) => {
    const pool = course.questionPool;

    it(`${course.id}: draws distinct questions from the pool with the same choices`, () => {
      drawMany(pool, 1).forEach((quiz) => {
        assert.equal(quiz.length, QUIZ_QUESTION_COUNT);
        assert.equal(new Set(quiz.map((question) => question.id)).size, quiz.length);
        quiz.forEach((question) => {
          const original = pool.find((candidate) => candidate.id === question.id);
          assert.ok(original, question.id);
          assert.deepEqual(sortedIds(question.choices), sortedIds(original.choices));
          assert.equal(question.correctChoiceId, original.correctChoiceId);
        });
      });
    });

    it(`${course.id}: every question appears and the set changes between attempts`, () => {
      const draws = drawMany(pool, 2);
      const seenIds = new Set(draws.flatMap((quiz) => quiz.map((question) => question.id)));
      assert.equal(seenIds.size, pool.length);
      const distinctSets = new Set(draws.map((quiz) => sortedIds(quiz).join(",")));
      assert.ok(distinctSets.size > 1);
    });

    it(`${course.id}: each question's correct answer moves between positions`, () => {
      const drawnQuestions = drawMany(pool, 3).flat();
      pool.forEach((original) => {
        const positions = new Set(
          drawnQuestions
            .filter((question) => question.id === original.id)
            .map((question) => question.choices.findIndex((choice) => choice.id === question.correctChoiceId)),
        );
        assert.ok(positions.size > 1, original.id);
      });
    });
  });

  it("returns the whole pool when asked for more than it has, and nothing for zero or negative", () => {
    const pool = courses[0]?.questionPool ?? [];
    assert.equal(drawQuiz(pool, pool.length + 1, Math.random).length, pool.length);
    assert.deepEqual(drawQuiz(pool, 0, Math.random), []);
    assert.deepEqual(drawQuiz(pool, -1, Math.random), []);
    assert.deepEqual(drawQuiz([], QUIZ_QUESTION_COUNT, Math.random), []);
  });

  it("does not mutate the pool", () => {
    const pool = courses[0]?.questionPool ?? [];
    const before = JSON.stringify(pool);
    drawQuiz(pool, QUIZ_QUESTION_COUNT, seededRandom(4));
    assert.equal(JSON.stringify(pool), before);
  });
});

describe("question pools", () => {
  courses.forEach((course) => {
    it(`${course.id}: the pool is large enough that one attempt shows only a fraction of it`, () => {
      assert.ok(course.questionPool.length >= QUIZ_QUESTION_COUNT * POOL_SIZE_PER_DRAW);
    });

    it(`${course.id}: explanations never point at a choice by its letter, because choices are shuffled`, () => {
      course.questionPool.forEach((question) => {
        assert.doesNotMatch(question.explanation, /(?<![A-Za-z0-9./-])[a-d](?![A-Za-z0-9./-])/, question.id);
      });
    });
  });
});
