import React from "react";
import Post from "../../models/post";
import PostContent from "../post-content/post-content";
import PostHeader from "../post-header/post-header";

import "./index.scss";

interface Props {
  post: Post;
}

const PostContainer = ({ post }: Props) => {
  return (
    <div className="post-wrapper">
      <article className="post">
        <PostHeader
          title={post.title}
          categories={post.categories}
          author={post.author}
          date={post.date}
        />
        <PostContent html={post.html} />
      </article>
    </div>
  );
};

export default PostContainer;
