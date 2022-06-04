import React from "react";

import Header from "../Header/header";
import Footer from "../Footer/footer";
import "./index.scss";

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
