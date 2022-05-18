import { navigate } from "gatsby";
import React, { useMemo } from "react";
import PostCard from "../../../components/Cards/PostCard/postCard";
import CategoryTag from "../../../components/Tags/CategoryTag/categoryTag";
import Post from "../../../models/post";
import "./index.scss";

interface Props {
  posts: Post[];
  categories: string[];
  category: string;
}

const PostCardList = ({ posts, categories, category }: Props) => {
  const tabIdx = categories.findIndex((c) => c === category);
  const onTabIdxChange = (idx: number) => {
    if (idx === 0) return navigate("/posts");
    return navigate(`/posts/${categories[idx]}`);
  };

  const filteredPosts = useMemo(() => {
    if (categories[tabIdx] === "All") return posts;

    return posts.filter((post) => post.categories.includes(categories[tabIdx]));
  }, [posts, categories, tabIdx]);

  return (
    <div className="post-card-list-wrapper">
      <div className="post-card-list">
        <h2 className="post-card-list-title">최근 포스트</h2>
        <div className="post-card-list-column">
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
              <CategoryTag
                idx={idx}
                text={category}
                onClick={() => onTabIdxChange(idx)}
                select={idx === tabIdx}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostCardList;
