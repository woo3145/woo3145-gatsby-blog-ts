import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useSiteMetadata } from "../../hooks/useSiteMetadate";

interface Props {
  title?: string;
  description?: string;
}
// https://www.gatsbyjs.com/docs/add-seo-component/ 참고

const SEO = ({ title, description }: Props) => {
  const { pathname } = useLocation();
  const site = useSiteMetadata();

  const seo = {
    title: title || site.title,
    description: description || site.description,
    image: `${site.siteUrl}${site.ogImage || ""}`,
    url: `${site.siteUrl}${pathname}`,
  };
  return (
    <Helmet title={seo.title}>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:site_name" content={site.title} />
      <meta property="og:locale" content="ko_KR" />
    </Helmet>
  );
};
export default SEO;
