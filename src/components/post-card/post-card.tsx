import React from "react";

import "./index.scss";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <article className="post-card-wrapper">
      <h3 className="post-card-title">{post.frontmatter.title}</h3>
      <div className="post-card-metadata">{post.frontmatter.date}</div>
      <div className="post-card-contents">{post.excerpt}</div>
    </article>
  );
};

export default PostCard;
