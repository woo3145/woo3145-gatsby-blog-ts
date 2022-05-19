import React from "react";

import "./index.scss";

interface Props {
  html: string;
}
const PostContent = ({ html }: Props) => {
  return (
    <div className="post-content-wrapper">
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default PostContent;
