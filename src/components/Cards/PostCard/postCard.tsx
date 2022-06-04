import { Link } from "gatsby";
import React from "react";

import Post from "../../../models/post";
import "./index.scss";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <article className="post-card-wrapper">
      <Link to={`/${post.id}`}>
        <h3 className="post-card-title">{post.title}</h3>
        <div className="post-card-metadata">
          <p className="post-card-metadata-date">{post.date}</p>
          <div className="post-card-metadata-categories">
            {post.categories.map((category, idx) => {
              return (
                <p key={idx} className="category">
                  {category}
                </p>
              );
            })}
          </div>
        </div>
        <div className="post-card-contents">{post.excerpt}</div>
      </Link>
    </article>
  );
};

export default PostCard;
