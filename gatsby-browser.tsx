import * as React from "react";
import type { GatsbyBrowser } from "gatsby";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => {
  console.log("Gatsby Brower - wrapPageElement");
  return element;
};
