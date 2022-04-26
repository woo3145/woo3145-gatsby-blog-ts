import { useSiteMetadata } from "../../hooks/useSiteMetadate";
import React from "react";

import "./index.scss";

const Footer = () => {
  const {
    autor: {
      name,
      social: { gitHub },
    },
  } = useSiteMetadata();
  return (
    <footer className="footer-wrapper">
      <p className="footer-text">
        © {new Date().getFullYear()}
        &nbsp;
        <a href={gitHub}>{name}</a>
        &nbsp;powered by
        <a
          target="_blank"
          href="https://github.com/woo3145/woo3145-gatsby-blog-ts"
        >
          &nbsp;woo3145-gatsby-blog-ts
        </a>
      </p>
    </footer>
  );
};

export default Footer;
