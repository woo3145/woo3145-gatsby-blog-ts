import type { GatsbyNode } from "gatsby";
import path from "path";

export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createPage } = actions;

  const pages = [{ id: 1, content: "hhhhh" }];

  pages.forEach((page) => {
    createPage({
      path: page.id.toString(),
      context: page,
      component: path.resolve("src/templates/Test.tsx"),
    });
  });
};
