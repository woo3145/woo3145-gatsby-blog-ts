import * as React from "react";
import type { GatsbyBrowser } from "gatsby";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => {
  console.log("Wrap");
  return (
    <div>
      <h1>Hello World</h1>
      {element}
    </div>
  );
};
