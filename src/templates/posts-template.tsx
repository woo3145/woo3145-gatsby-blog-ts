import React from "react";
import Layout from "../components/Layout/layout";

import Post from "../models/post";
import SEO from "../components/seo/seo";
import Posts from "../containers/Posts";
import { useSiteMetadata } from "../hooks/useSiteMetadate";

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
      <Posts posts={posts} categories={categories} category={category} />
    </Layout>
  );
};

export default PostListTemplate;
