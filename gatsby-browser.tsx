import type { GatsbyBrowser } from "gatsby";

// gatsby-browser.js

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => {
  console.log("Gatsby Brower - wrapPageElement");
  return element;
};
