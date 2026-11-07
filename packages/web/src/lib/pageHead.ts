import { findSitePage, PAGE_HEAD_ATTRIBUTE, renderHeadTags, sitePages } from "@security-education/course";

const pages = sitePages();

export const applyPageHead = (routePath: string) => {
  const page = findSitePage(pages, routePath);
  if (!page) return;
  document.head.querySelectorAll(`[${PAGE_HEAD_ATTRIBUTE}]`).forEach((element) => element.remove());
  document.head.querySelector("title")?.remove();
  document.head.insertAdjacentHTML("beforeend", renderHeadTags(page));
};
