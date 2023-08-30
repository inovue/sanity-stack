import {visit} from 'unist-util-visit';

import { Plugin } from 'unified';
import { Root, Element, Comment, Properties, Literal } from 'hast';

export type RehypeEscapeMermaidOptions = {}

const rehypeEscapeMermaid: Plugin<[RehypeEscapeMermaidOptions?], Root> = (options = {}) => {

  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (parent && typeof index === 'number' && node.tagName === 'pre' && node.children.length === 1 ){
        let firstChild = node.children[0] as Element;
        let childClassNames = firstChild.properties?.className;
        if(firstChild.tagName === 'code' && Array.isArray(childClassNames) && childClassNames.includes('language-mermaid')) {
          firstChild.tagName = 'div';
          parent.children[index] = firstChild;
        }
      }
    });
  };
}

export default rehypeEscapeMermaid;