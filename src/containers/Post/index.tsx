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

      <PostToc html={post.tableOfContents} />
    </article>
  );
};

export default PostPageContainer;
