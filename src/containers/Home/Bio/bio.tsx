import React from "react";
import { useSiteMetadata } from "../../../hooks/useSiteMetadate";

import "./index.scss";
import Image from "../../../components/image/image";
import SocialBar from "../../../components/social-bar/social-bar";

const Bio = () => {
  const { autor } = useSiteMetadata();
  return (
    <div className="bio-wrapper">
      <div className="bio-image-container">
        <Image src={autor.image} />
      </div>

      <div className="bio-info">
        <p className="bio-info-name">
          <strong>@ {autor.name}</strong>
          <br />
        </p>
        <div className="bio-info-position">
          <span># {autor.position}</span>
        </div>
        <p className="bio-info-introdution">{autor.comment}</p>
        <SocialBar social={autor.social} />
      </div>
    </div>
  );
};

export default Bio;
