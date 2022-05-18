import { navigate } from "gatsby";
import React from "react";
import Post from "../../models/post";
import PostCardList from "./PostCardList/postCardList";
import PostsPageHeader from "./PostsPageHeader.tsx/postsPageHeader";

interface Props {
  posts: Post[];
  categories: string[];
  category: string;
}

const Posts = ({ posts, categories, category }: Props) => {
  return (
    <>
      <PostsPageHeader title={category} postsCount={posts.length} />
      <PostCardList posts={posts} categories={categories} category={category} />
    </>
  );
};

export default Posts;
