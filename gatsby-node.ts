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
            excerpt(pruneLength: 200, truncate: true)
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
  const posts = data.allMarkdownRemark.edges;

  const postPages = path.resolve("./src/templates/post-template.tsx");
  const postListPages = path.resolve("./src/templates/posts-template.tsx");

  const categorySet = new Set(["All"]);
  posts.forEach(({ node }: any) => {
    const categories = node.frontmatter.categories.split(" ");
    categories.forEach((category: string) => categorySet.add(category));
  });
  // 가져온 글들로 정적 페이지를 생성해준다.
  // https://www.gatsbyjs.com/docs/tutorial/part-6/#render-post-contents-in-the-blog-post-page-template
  posts.forEach(({ node }): any => {
    createPage({
      component: postPages,
      path: node.id,
      context: {
        id: node.id,
        post: node,
      },
    });
  });

  createPage({
    component: postListPages,
    path: "/posts",
    context: {
      categories: [...categorySet],
      category: "All",
      results: posts,
    },
  });

  [...categorySet].forEach((category) => {
    createPage({
      component: postListPages,
      path: `/posts/${category}`,
      context: {
        categories: [...categorySet],
        category,
        results: posts.filter(({ node }) =>
          node.frontmatter.categories.includes(category)
        ),
      },
    });
  });
};
