import { navigate } from "gatsby";
import React from "react";
import Layout from "../components/Layout/layout";

import PostListHeader from "../components/post-list-header/post-list-header";
import PostCardList from "../components/post-card-list/post-card-list";
import Post from "../models/post";
import SEO from "../components/seo/seo";

interface Props {
  pageContext: {
    results: { node: MarkdownRemarkNode }[];
    category: string;
    categories: string[];
  };
}

const PostListTemplate = ({ pageContext }: Props) => {
  const { results, category, categories } = pageContext;
  const posts = results.map(({ node }) => {
    return new Post(node);
  });

  const tabIdx = categories.findIndex((c) => c === category);
  const onTabIdxChange = (idx: number) => {
    if (idx === 0) return navigate("/posts");
    return navigate(`/posts/${categories[idx]}`);
  };

  return (
    <Layout>
      <SEO title={"Posts"} />
      <PostListHeader title={category} postsLen={posts.length} />
      <PostCardList
        posts={posts}
        categories={categories}
        tabIdx={tabIdx}
        onTabIdxChange={onTabIdxChange}
      />
    </Layout>
  );
};

export default PostListTemplate;
