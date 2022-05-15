import Post from "../models/post";

export const getUniqueCategories = (posts: Post[]) => {
  const set = new Set<string>();
  posts.forEach((post) =>
    post.categories.forEach((category) => set.add(category))
  );
  return [...set];
};

export const getLocalStorageItem = (key: string) => {
  if (typeof window === "undefined") return null;
  const data = window.localStorage.getItem(key);

  if (!data) return null;
  return JSON.parse(data);
};
export const setLocalStorageItem = (key: string, value: string) => {
  if (typeof window === "undefined") return;
  return window.localStorage.setItem(key, JSON.stringify(value));
};
