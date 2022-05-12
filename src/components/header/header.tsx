import React from "react";
import { useSiteMetadata } from "../../hooks/useSiteMetadate";
import { Link } from "gatsby";

import "./index.scss";

const Header = () => {
  const { title } = useSiteMetadata();

  const darkModeToggle = () => {
    const element = document.getElementById("dark-mode-btn-inner");
    if (element) {
      if (element.classList.contains("active")) {
        element.classList.remove("active");
        document.documentElement.setAttribute("data-theme", "light");
      } else {
        element.classList.add("active");
        document.documentElement.setAttribute("data-theme", "dark");
      }
    }
  };
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
          <div className="dark-mode-btn" onClick={darkModeToggle}>
            <div className="dark-mode-btn-inner" id="dark-mode-btn-inner"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
