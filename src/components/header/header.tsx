import React, { useEffect, useState } from "react";
import { useSiteMetadata } from "../../hooks/useSiteMetadate";
import { Link } from "gatsby";

import "./index.scss";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/helpers";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    getLocalStorageItem("isDarkMode") || "light"
  );
  const { title } = useSiteMetadata();

  useEffect(() => {
    setLocalStorageItem("isDarkMode", isDarkMode);
    document.documentElement.setAttribute("data-theme", isDarkMode);
  }, [isDarkMode]);
  console.log(isDarkMode);
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
          <div
            className="dark-mode-btn"
            onClick={() =>
              setIsDarkMode(isDarkMode === "light" ? "dark" : "light")
            }
          >
            <div
              className={`dark-mode-btn-inner ${
                isDarkMode === "dark" ? "active" : ""
              }`}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
