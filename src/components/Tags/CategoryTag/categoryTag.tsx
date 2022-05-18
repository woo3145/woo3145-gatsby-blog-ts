import React from "react";

import "./index.scss";

interface Props {
  idx: number;
  text: string;
  select: boolean;
  onClick: () => Promise<void>;
}

const CategoryTag = ({ idx, text, select, onClick }: Props) => {
  return (
    <div
      className={`category-tag ${select ? "category-tag-select" : ""}`}
      key={idx}
      onClick={() => onClick}
    >
      {text}
    </div>
  );
};

export default CategoryTag;
