import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { useSiteMetadata } from "../../hooks/useSiteMetadate";
import Image from "../image/image";

import "./index.scss";

const Bio = () => {
  const { title, autor } = useSiteMetadata();
  console.log();
  return (
    <div className="bio-wrapper">
      <div className="">gggg</div>
      <Image style={{ width: 200, height: 200 }} src={autor.image} />
    </div>
  );
};

export default Bio;
