import { Lang } from "shiki";

export default function getLangTypesFromMarkdown(markdownContent: string) {
  return Array.from(new Set(Array.from(
    markdownContent.matchAll(/^```(?<lang>\w+)\s?.*$/gm), 
    (v=>v.groups?.lang)
  ).filter((v):v is Lang => !!v )));
}
