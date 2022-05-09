import { navigate } from "gatsby";
import React from "react";
import PostListHeader from "../components/post-list-header/post-list-header";
import PostList from "../components/post-list/post-list";
import Layout from "../layout";
import Post from "../models/post";

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
      <PostListHeader title={category} postsLen={posts.length} />
      <PostList
        posts={posts}
        categories={categories}
        tabIdx={tabIdx}
        onTabIdxChange={onTabIdxChange}
      />
    </Layout>
  );
};

export default PostListTemplate;
