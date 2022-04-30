import React from "react";
import Post from "../../models/post";
import PostCard from "../post-card/post-card";

import "./index.scss";

interface Props {
  posts: Post[];
}

const PostList = ({ posts }: Props) => {
  return (
    <div className="post-list-wrapper">
      <div className="post-list">
        <h2 className="post-list-title">최근 포스트</h2>
        <div className="post-list-column">
          {posts.map((post) => {
            return <PostCard post={post} />;
          })}
        </div>
      </div>
      <div className="tag-list">
        <h4 className="tag-list-title">Tags</h4>
      </div>
    </div>
  );
};

export default PostList;
