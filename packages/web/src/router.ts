import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import CourseView from "./views/CourseView.vue";
import QuizView from "./views/QuizView.vue";
import ChecklistView from "./views/ChecklistView.vue";
import CategoryView from "./views/CategoryView.vue";
import AudienceView from "./views/AudienceView.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/checklist", name: "checklist", component: ChecklistView },
    { path: "/categories/:categoryId", name: "category", component: CategoryView, props: true },
    { path: "/for/:audienceId", name: "audience", component: AudienceView, props: true },
    { path: "/courses/:courseId", name: "course", component: CourseView, props: true },
    { path: "/courses/:courseId/quiz", name: "quiz", component: QuizView, props: true },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});
