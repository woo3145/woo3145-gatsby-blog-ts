import Post from "../models/post";

export const getUniqueCategories = (posts: Post[]) => {
  const set = new Set<string>();
  posts.forEach((post) =>
    post.categories.forEach((category) => set.add(category))
  );
  return [...set];
};
