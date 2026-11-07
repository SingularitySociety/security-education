import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { courses, draftCourses } from "@security-education/course";
import type { Course } from "@security-education/course";
import { isCourseReadings, readingProblems, readingsFileName } from "../src/readings.ts";

const packageDir = fileURLToPath(new URL("../", import.meta.url));

const problemsOf = async (course: Course): Promise<string[]> => {
  const readingsPath = path.join(packageDir, readingsFileName(course.id));
  try {
    const parsed: unknown = JSON.parse(await readFile(readingsPath, "utf8"));
    if (!isCourseReadings(parsed)) return [`${readingsPath}: not an object of string arrays`];
    return course.scenes.flatMap((scene) =>
      readingProblems(scene.narration, parsed[scene.id]).map((problem) => `${course.id}/${scene.id}: ${problem}`),
    );
  } catch (error) {
    return [`${readingsPath}: ${error instanceof Error ? error.message : String(error)}`];
  }
};

const main = async (): Promise<void> => {
  const requested = process.argv.slice(2);
  const targets = [...courses, ...draftCourses].filter(
    (course) => requested.length === 0 || requested.includes(course.id),
  );
  const problems = (await Promise.all(targets.map(problemsOf))).flat();
  problems.forEach((problem) => console.log(problem));
  console.log(`${targets.length} courses checked, ${problems.length} problems`);
  if (problems.length > 0) process.exitCode = 1;
};

await main();
