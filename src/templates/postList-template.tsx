import React from "react";
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
  console.log(posts);
  return (
    <Layout>
      <div>hh</div>
    </Layout>
  );
};

export default PostListTemplate;
