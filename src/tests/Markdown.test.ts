import { expect, test } from 'vitest'

import { getLangTypesFromMarkdown } from "../lib/markdown-to-html-browser";

test('markdown to html browser test', () => {
  expect((()=>{
    const markdown = `
\`\`\`mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
\`\`\`

\`\`\`mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
\`\`\`

\`\`\`js
console.log('hello world');
\`\`\`

\`\`\`javascript
console.log('hello world');
\`\`\`
`

    const result = getLangTypesFromMarkdown(markdown);
    return result
  })())
})