import React from "react";
import { useSiteMetadata } from "../../hooks/useSiteMetadate";
import { IoLogoGithub, IoMailSharp } from "react-icons/io5";

import "./index.scss";
import { Link } from "gatsby";

const Header = () => {
  const {
    title,
    autor: {
      social: { gitHub, email },
    },
  } = useSiteMetadata();
  return (
    <header className="header-wrapper">
      <div className="header">
        <div className="header-menu">
          <Link to="/about" className="link">
            about
          </Link>
          <Link to="/posts" className="link">
            posts
          </Link>
        </div>
        <div className="header-title">
          <Link to="/" className="link">
            {title}
          </Link>
        </div>
        <div className="header-info">
          <div className="header-info-sns">
            <a href={gitHub} className="icon" target="_blank">
              <IoLogoGithub size="20px" />
            </a>
            <a href={`mailto:${email}`} className="icon" target="_blank">
              <IoMailSharp size="20px" />
            </a>
          </div>
          <span className="header-info-search"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
