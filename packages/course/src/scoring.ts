import type { QuizQuestion } from "./types.ts";

export const PASS_THRESHOLD_PERCENT = 80;
const PERCENT_SCALE = 100;

export type Answers = Readonly<Record<string, string>>;

export type QuestionResult = {
  questionId: string;
  chosenChoiceId: string | null;
  isCorrect: boolean;
};

export type QuizResult = {
  correctCount: number;
  total: number;
  scorePercent: number;
  passed: boolean;
  questionResults: QuestionResult[];
};

const judgeQuestion = (question: QuizQuestion, answers: Answers): QuestionResult => {
  const chosenChoiceId = answers[question.id] ?? null;
  return { questionId: question.id, chosenChoiceId, isCorrect: chosenChoiceId === question.correctChoiceId };
};

export const toScorePercent = (correctCount: number, total: number): number =>
  total === 0 ? 0 : Math.round((correctCount / total) * PERCENT_SCALE);

export const scoreQuiz = (quiz: readonly QuizQuestion[], answers: Answers): QuizResult => {
  const questionResults = quiz.map((question) => judgeQuestion(question, answers));
  const correctCount = questionResults.filter((result) => result.isCorrect).length;
  const scorePercent = toScorePercent(correctCount, quiz.length);
  return {
    correctCount,
    total: quiz.length,
    scorePercent,
    passed: quiz.length > 0 && scorePercent >= PASS_THRESHOLD_PERCENT,
    questionResults,
  };
};

export const isQuizComplete = (quiz: readonly QuizQuestion[], answers: Answers): boolean =>
  quiz.every((question) => typeof answers[question.id] === "string");
