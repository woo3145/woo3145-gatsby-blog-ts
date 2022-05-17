import React from "react";

import "./index.scss";
import Header from "../header/header";
import Footer from "../footer/footer";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="page-contents">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
