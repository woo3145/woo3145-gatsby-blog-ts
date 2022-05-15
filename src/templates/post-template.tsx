import React from "react";
import Layout from "../layout";
import PostContainer from "../components/post-container/post-container";
import Post from "../models/post";
import SEO from "../components/seo/seo";

interface Props {
  pageContext: {
    post: MarkdownRemarkNode;
  };
}

const PostTemplate = ({ pageContext }: Props) => {
  const post = new Post(pageContext.post);
  return (
    <Layout>
      <SEO title={post.title} description={post.excerpt} />
      <PostContainer post={post} />
    </Layout>
  );
};

export default PostTemplate;
