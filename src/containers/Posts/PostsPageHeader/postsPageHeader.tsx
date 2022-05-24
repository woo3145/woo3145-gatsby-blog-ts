import React from "react";

import "./index.scss";

interface Props {
  title: string;
  postsCount: number;
}

const PostsPageHeader = ({ title, postsCount }: Props) => {
  return (
    <div className="posts-page-header-wrapper">
      <h1># {title}</h1>
      <p>
        posts <strong>{postsCount}</strong>
      </p>
    </div>
  );
};

export default PostsPageHeader;
