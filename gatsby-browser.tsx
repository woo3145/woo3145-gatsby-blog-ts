import type { GatsbyBrowser } from "gatsby";

// gatsby-browser.js

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => {
  return element;
};
