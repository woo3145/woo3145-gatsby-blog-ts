import { GatsbyNode } from "gatsby";
import path from "path";

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions;

  // graphQL을 이용하여 Gatsby에서 파싱한 블로그 글을 모두 불러온다.
  const { data, errors } = await graphql<any, any>(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            excerpt(pruneLength: 500, truncate: true)
            html
            frontmatter {
              author
              categories
              date
              tags
              title
            }
          }
        }
      }
    }
  `);

  if (errors) {
    throw errors;
  }
  // 임시
  const postsPages = path.resolve("./src/templates/post-template.tsx");

  // 가져온 글들로 정적 페이지를 생성해준다.
  // https://www.gatsbyjs.com/docs/tutorial/part-6/#render-post-contents-in-the-blog-post-page-template
  data.allMarkdownRemark.edges.forEach(({ node }): any => {
    createPage({
      component: postsPages,
      path: node.id,
      context: {
        id: node.id,
      },
    });
  });
};
