import type { GatsbyConfig } from "gatsby";
import path from "path";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `woo3145-gatsby-blog-ts`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "1",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
    },
    {
      // 블로그 글이 위치할 posts 폴더를 읽어줍니다.
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: path.resolve("posts"),
      },
    },
    // gatsby에서 읽은 파일들 중 md파일을 해석하여 MarkDownRemark 노드로 변환해준다.
    "gatsby-transformer-remark",
  ],
};

export default config;
