import React, { useMemo } from "react";
import { usePosts } from "../../../hooks/usePosts";
import { getUniqueCategories } from "../../../utils/helpers";

import "./index.scss";
import PostCard from "../../../components/Cards/PostCard/postCard";

const RecentPosts = () => {
  const posts = usePosts();
  const categories = ["All", ...getUniqueCategories(posts)];
  const [tabIdx, setTabIdx] = React.useState(0);
  const onTabIdxChange = (idx: number) => setTabIdx(idx);

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

export default RecentPosts;
