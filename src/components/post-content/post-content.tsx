import React, { useEffect, useState } from "react";

import "./index.scss";

interface Props {
  html: string;
}

const PostContent = ({ html }: Props) => {
  const [headers, setHeader] = useState<any>(null);

  useEffect(() => {
    setHeader(
      document.querySelectorAll(".markdown-body > h2, .markdown-body > h3")
    );
    console.log(headers);
  }, []);
  console.log(headers);

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
