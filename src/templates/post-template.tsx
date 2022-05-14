import { graphql } from "gatsby";
import React from "react";
import Layout from "../layout";
import PostContainer from "../components/post-container/post-container";
import Post from "../models/post";

interface Props {
  data: {
    markdownRemark: MarkdownRemarkNode;
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

const PostTemplate = ({ data }: Props) => {
  const post = new Post(data.markdownRemark);
  return (
    <Layout>
      <PostContainer post={post} />
    </Layout>
  );
};

export default PostTemplate;

export const query = graphql`
  query ($id: String) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 200, truncate: true)
      frontmatter {
        author
        categories
        date(formatString: "MMMM DD, YYYY")
        tags
        title
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
