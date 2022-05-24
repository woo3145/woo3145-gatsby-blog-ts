import React from "react";
import Layout from "../components/Layout/layout";

import Post from "../models/post";
import SEO from "../components/Seo/seo";
import { useSiteMetadata } from "../hooks/useSiteMetadate";
import PostsPageConainer from "../containers/Posts";

interface Props {
  pageContext: {
    results: { node: MarkdownRemarkNode }[];
    category: string;
    categories: string[];
  };
}

const PostListTemplate = ({ pageContext }: Props) => {
  const { title } = useSiteMetadata();
  const { results, category, categories } = pageContext;
  const posts = results.map(({ node }) => {
    return new Post(node);
  });

  return (
    <Layout>
      <SEO title={`${title} - Posts`} />
      <PostsPageConainer
        posts={posts}
        categories={categories}
        category={category}
      />
    </Layout>
  );
};

export default PostListTemplate;
