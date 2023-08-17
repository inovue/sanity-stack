import {visit} from 'unist-util-visit';

/** @type {import('unified').Plugin<[], import('hast').Root>} */
export default function rehypeEscapeMermaid() {
  return (tree: any) => {
    visit(tree, "element", (node, index, parent) => {
      if (typeof index === 'number' && node.tagName === 'pre' && node.children.length === 1 ){
        let firstChild = node.children[0];
        let childClassNames = firstChild.properties?.className;
        if(firstChild.tagName === 'code' && Array.isArray(childClassNames) && childClassNames.includes('language-mermaid')) {
          firstChild.tagName = 'div';
          parent.children[index] = firstChild;
        }
      }
    });
  };
}