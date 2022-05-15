import { graphql, useStaticQuery } from "gatsby";

// https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query

interface DataProps {
  site: {
    siteMetadata: {
      title: string;
      siteUrl: string;
      description: string;
      ogImage: string;
      autor: {
        name: string;
        position: string;
        image: string;
        comment: string;
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
          description
          ogImage
          autor {
            name
            position
            image
            comment
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
