import { graphql, useStaticQuery } from "gatsby";

// https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query

interface DataProps {
  site: {
    siteMetadata: {
      title: string;
      siteUrl: string;
      autor: {
        name: string;
        position: string;
        image: string;
        social: {
          gitHub: string;
          email: string;
        };
      };
    };
  };
}

export const useSiteMetadata = () => {
  const data = useStaticQuery<DataProps>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          siteUrl
          autor {
            name
            position
            image
            social {
              gitHub
              email
            }
          }
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
