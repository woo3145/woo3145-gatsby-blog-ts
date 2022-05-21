import React from "react";

import "./index.scss";

interface Props {
  idx: number;
  text: string;
  select: boolean;
  onClick: () => Promise<void>;
}

const CategoryTag = ({ text, select, onClick }: Props) => {
  return (
    <div
      className={`category-tag ${select ? "category-tag-select" : ""}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default CategoryTag;
