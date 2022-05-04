import React from "react";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import useScroll from "../hooks/useScroll";

import "./style.scss";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  const { y } = useScroll();
  return (
    <div className="page-wrapper">
      <Header />
      <main className="page-contents">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
