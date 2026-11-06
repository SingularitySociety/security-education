import type { QuizQuestion } from "./types.ts";

export const QUIZ_QUESTION_COUNT = 5;

/** Returns a number in [0, 1), like `Math.random`. */
export type RandomSource = () => number;

export const shuffled = <Item>(items: readonly Item[], random: RandomSource): Item[] =>
  items
    .map((item) => ({ item, sortKey: random() }))
    .sort((left, right) => left.sortKey - right.sortKey)
    .map(({ item }) => item);

const withShuffledChoices = (question: QuizQuestion, random: RandomSource): QuizQuestion => ({
  ...question,
  choices: shuffled(question.choices, random),
});

export const drawQuiz = (
  questionPool: readonly QuizQuestion[],
  questionCount: number,
  random: RandomSource,
): QuizQuestion[] =>
  shuffled(questionPool, random)
    .slice(0, Math.max(0, questionCount))
    .map((question) => withShuffledChoices(question, random));
