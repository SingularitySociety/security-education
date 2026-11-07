import { createApp } from "vue";
import { pathFromLegacyHash } from "@security-education/course";
import App from "./App.vue";
import { applyPageHead } from "./lib/pageHead.ts";
import { router } from "./router.ts";
import "./style.css";

router.afterEach((to) => applyPageHead(to.path));
createApp(App).use(router).mount("#app");

// Links shared before pages had their own URLs look like /#/courses/<id>.
const legacyPath = pathFromLegacyHash(window.location.hash);
if (legacyPath !== undefined) await router.replace(legacyPath);
