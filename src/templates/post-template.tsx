import React from "react";
import Layout from "../layout";
import PostContainer from "../components/post-container/post-container";
import Post from "../models/post";

interface Props {
  pageContext: {
    post: MarkdownRemarkNode;
  };
}

const PostTemplate = ({ pageContext }: Props) => {
  const post = new Post(pageContext.post);
  return (
    <Layout>
      <PostContainer post={post} />
    </Layout>
  );
};

export default PostTemplate;
