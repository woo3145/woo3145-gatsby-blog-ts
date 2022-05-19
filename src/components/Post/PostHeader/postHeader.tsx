import React from "react";

import "./index.scss";

interface Props {
  title: string;
  categories: string[];
  author: string;
  date: Date;
}

const PostHeader = ({ title, categories, author, date }: Props) => {
  return (
    <header className="post-header-wrapper">
      <div className="post-header-categories">
        {categories.map((category, idx) => {
          return (
            <div key={idx} className="category">
              {category}
            </div>
          );
        })}
      </div>
      <h1 className="post-header-title">{title}</h1>
      <div className="post-header-metadata">
        <span>
          <strong>@{author}</strong>
        </span>
        <span>{date}</span>
      </div>
    </header>
  );
};

export default PostHeader;
