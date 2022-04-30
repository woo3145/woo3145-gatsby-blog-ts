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
  console.log(data);

  if (errors) {
    throw errors;
  }
  // 임시
  const postsPages = path.resolve("./src/templates/Test.tsx");

  // 가져온 글들로 정적 페이지를 생성해준다.
  data.allMarkdownRemark.edges.forEach(({ node }): any => {
    createPage({
      component: postsPages,
      path: node.id,
      context: {
        html: node.html,
        title: node.frontmatter.title,
      },
    });
  });
};
