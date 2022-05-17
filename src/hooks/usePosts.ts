import { graphql, useStaticQuery } from "gatsby";
import Post from "../models/post";

interface DataProps {
  allMarkdownRemark: {
    edges: {
      node: MarkdownRemarkNode;
    }[];
  };
}

export const usePosts = () => {
  const data = useStaticQuery<DataProps>(graphql`
    query Posts {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            id
            excerpt(pruneLength: 200, truncate: true)
            html
            frontmatter {
              author
              categories
              date(formatString: "MMMM DD, YYYY")
              tags
              title
            }
          }
        }
      }
    }
  `);
  const posts = data.allMarkdownRemark.edges.map(({ node }) => {
    return new Post(node);
  });
  return posts;
};
