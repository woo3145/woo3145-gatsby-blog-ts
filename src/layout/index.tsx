import React from "react";

import "./index.scss";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import SEO from "../components/seo/seo";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  return (
    <div className="page-wrapper">
      <SEO title={"Home"} />
      <Header />
      <main className="page-contents">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
