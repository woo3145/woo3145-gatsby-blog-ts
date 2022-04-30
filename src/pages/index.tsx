import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../layout";
import Bio from "../components/bio/bio";
import PostList from "../components/post-list/post-list";
import Post from "../models/post";

interface DataProps {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  allMarkdownRemark: {
    edges: {
      node: MarkdownRemarkNode;
    }[];
  };
}

const IndexRoute = ({
  data: { site, allMarkdownRemark },
  path,
}: PageProps<DataProps>) => {
  const posts = allMarkdownRemark.edges.map(({ node }) => {
    return new Post(node);
  });

  return (
    <Layout>
      <Bio />
      <PostList posts={posts} />
    </Layout>
  );
};

export default IndexRoute;

export const query = graphql`
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
            date(formatString: "MMMM DD, YYYY")
            tags
            title
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
