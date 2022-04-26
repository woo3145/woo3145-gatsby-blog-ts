import React from "react";
import { useSiteMetadata } from "../../hooks/useSiteMetadate";
import { Link } from "gatsby";

import "./index.scss";

const Header = () => {
  const { title } = useSiteMetadata();
  return (
    <header className="header-wrapper">
      <div className="header">
        <div className="header-title">
          <Link to="/" className="link">
            {title}
          </Link>
        </div>
        <div className="header-menu">
          <Link to="/about" className="link">
            about
          </Link>
          <Link to="/posts" className="link">
            posts
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
