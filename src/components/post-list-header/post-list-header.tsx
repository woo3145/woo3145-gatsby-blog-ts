import React from "react";

import "./index.scss";

interface Props {
  title: string;
  postsLen: number;
}

const PostListHeader = ({ title, postsLen }: Props) => {
  return (
    <div className="post-list-header-wrapper">
      <h1># {title}</h1>
      <p>posts {postsLen}</p>
    </div>
  );
};

export default PostListHeader;
