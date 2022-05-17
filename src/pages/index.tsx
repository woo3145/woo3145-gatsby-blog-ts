import * as React from "react";
import Layout from "../components/Layout/layout";
import SEO from "../components/seo/seo";
import Home from "../containers/Home";
import { useSiteMetadata } from "../hooks/useSiteMetadate";

const IndexRoute = () => {
  const { description, title } = useSiteMetadata();
  return (
    <Layout>
      <SEO title={`${title} - Home`} description={description} />
      <Home />
    </Layout>
  );
};

export default IndexRoute;
