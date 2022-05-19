import React, { useEffect, useState } from "react";
import Post from "../../models/post";

import "./index.scss";
import PostContent from "./PostContent/postContent";
import PostHeader from "./PostHeader/postHeader";
import PostToc from "./PostToc/postToc";

interface Props {
  post: Post;
}

const PostPageContainer = ({ post }: Props) => {
  const [headers, setHeaders] = useState<any>([]);
  // toc 된 h2, h3 요소를 저장한다.
  useEffect(() => {
    setHeaders(
      document.querySelectorAll<HTMLHeadingElement>(
        ".markdown-body > h2, .markdown-body > h3"
      )
    );
  }, []);
  return (
    <article className="post-wrapper">
      <div className="post">
        <PostHeader
          title={post.title}
          categories={post.categories}
          author={post.author}
          date={post.date}
        />
        <PostContent html={post.html} />
      </div>

      <PostToc html={post.tableOfContents} headers={headers} />
    </article>
  );
};

export default PostPageContainer;
