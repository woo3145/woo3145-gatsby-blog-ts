import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../layout";

interface DataProps {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const IndexRoute = ({ data: { site }, path }: PageProps<DataProps>) => {
  return (
    <Layout>
      <h1>{site.siteMetadata.title}</h1>
    </Layout>
  );
};

export default IndexRoute;

export const query = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
