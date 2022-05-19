import React from "react";
import Layout from "../components/Layout/layout";
import Post from "../models/post";
import SEO from "../components/seo/seo";
import PostPageContainer from "../containers/Post";

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
      <PostPageContainer post={post} />
    </Layout>
  );
};

export default PostTemplate;
