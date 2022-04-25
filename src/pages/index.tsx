import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../layout";
import Bio from "../components/bio/bio";

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
      <Bio />
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
