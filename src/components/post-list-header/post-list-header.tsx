import React from "react";

import "./index.scss";

interface Props {
  title: string;
}

const PostListHeader = ({ title }: Props) => {
  return (
    <div className="post-list-header-wrapper">
      <h1>{title}</h1>
    </div>
  );
};

export default PostListHeader;
