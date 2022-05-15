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
    if (isDarkMode === "dark") {
      document.getElementById("dark-mode-btn-inner")?.classList.add("active");
    } else {
      document
        .getElementById("dark-mode-btn-inner")
        ?.classList.remove("active");
    }
    document.documentElement.setAttribute("data-theme", isDarkMode);
  }, [isDarkMode]);

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
              className={`dark-mode-btn-inner`}
              id="dark-mode-btn-inner"
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
