import React, { useMemo } from "react";
import Post from "../../models/post";
import PostCard from "../post-card/post-card";
import "./index.scss";

interface Props {
  posts: Post[];
  categories: string[];
  tabIdx: number;
  onTabIdxChange: (v: number) => void;
}

const PostCardList = ({ posts, categories, tabIdx, onTabIdxChange }: Props) => {
  const filteredPosts = useMemo(() => {
    if (categories[tabIdx] === "All") return posts;

    return posts.filter((post) => post.categories.includes(categories[tabIdx]));
  }, [posts, categories, tabIdx]);
  return (
    <div className="post-list-wrapper">
      <div className="post-list">
        <h2 className="post-list-title">최근 포스트</h2>
        <div className="post-list-column">
          {filteredPosts &&
            filteredPosts.map((post, idx) => {
              return <PostCard key={idx} post={post} />;
            })}
        </div>
      </div>
      <div className="category-list">
        <h4 className="category-list-title">Tags</h4>
        <div className="category-list-items">
          {categories.map((category, idx) => {
            return (
              <div
                className={`category ${tabIdx === idx && "category-select"}`}
                key={idx}
                onClick={() => {
                  onTabIdxChange(idx);
                }}
              >
                {category}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostCardList;
