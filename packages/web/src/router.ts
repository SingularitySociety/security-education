import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import CourseView from "./views/CourseView.vue";
import QuizView from "./views/QuizView.vue";
import ChecklistView from "./views/ChecklistView.vue";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/checklist", name: "checklist", component: ChecklistView },
    { path: "/courses/:courseId", name: "course", component: CourseView, props: true },
    { path: "/courses/:courseId/quiz", name: "quiz", component: QuizView, props: true },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});
