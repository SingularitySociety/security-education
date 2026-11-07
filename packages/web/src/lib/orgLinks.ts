export type OrgLink = {
  label: string;
  href: string;
};

export const ORG_NAME = "Singularity Society";
export const ORG_SITE_URL = "https://singularitysociety.org";

export const orgLinks: readonly OrgLink[] = [
  { label: "Webサイト", href: ORG_SITE_URL },
  { label: "note", href: "https://note.com/singsoc" },
  { label: "X", href: "https://x.com/SingularitySoci" },
];
