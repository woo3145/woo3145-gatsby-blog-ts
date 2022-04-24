import React from "react";
import Header from "../components/header/header";

import "./style.scss";

interface Props {
  children: JSX.Element;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="page-contents">{children}</main>
      <footer></footer>
    </div>
  );
};

export default Layout;
