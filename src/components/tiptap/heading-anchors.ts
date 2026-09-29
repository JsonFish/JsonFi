import { Extension } from "@tiptap/react";
import type { Node } from "@tiptap/pm/model";
import { Plugin } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

export type ArticleHeading = {
  id: string;
  text: string;
  level: number;
  pos: number;
};

// ProseMirror docs are immutable, so one doc instance always yields the same
// headings. Caching by doc identity keeps the array reference stable across
// selection-only transactions: useEditorState's equality check short-circuits
// and the decoration plugin below can skip rebuilds.
const headingsCache = new WeakMap<Node, ArticleHeading[]>();

export function getArticleHeadings(doc: Node): ArticleHeading[] {
  const cached = headingsCache.get(doc);
  if (cached) return cached;

  const headings: ArticleHeading[] = [];
  const ids = new Set<string>();

  doc.descendants((node, pos) => {
    if (node.type.name !== "heading") return;
    const text = node.textContent.trim();
    if (!text) return;

    const slug = text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-|-$/g, "");
    const base = `article-heading-${slug || "section"}`;
    let id = base;
    let suffix = 2;
    while (ids.has(id)) id = `${base}-${suffix++}`;
    ids.add(id);
    headings.push({ id, text, level: node.attrs.level, pos });
  });

  headingsCache.set(doc, headings);
  return headings;
}

// Decorations add navigation anchors without changing the stored Markdown.
export const HeadingAnchors = Extension.create({
  name: "headingAnchors",
  addProseMirrorPlugins() {
    let decoratedDoc: Node | null = null;
    let decorations = DecorationSet.empty;

    return [
      new Plugin({
        props: {
          decorations(state) {
            if (state.doc === decoratedDoc) return decorations;
            decoratedDoc = state.doc;
            decorations = DecorationSet.create(
              state.doc,
              getArticleHeadings(state.doc).map(({ id, pos }) =>
                Decoration.node(pos, pos + state.doc.nodeAt(pos)!.nodeSize, {
                  id,
                  tabindex: "-1",
                  class: "scroll-mt-28",
                }),
              ),
            );
            return decorations;
          },
        },
      }),
    ];
  },
});
