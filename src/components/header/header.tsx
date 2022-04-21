import React from "react";
import { useSiteMetadata } from "../../hooks/useSiteMetadate";

const Header = () => {
  const { title } = useSiteMetadata();
  return <header>{title}</header>;
};

export default Header;
