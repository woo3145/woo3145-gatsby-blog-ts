import type { GatsbyConfig } from "gatsby";
import path from "path";
import metaConfig from "./gatsby-meta-config";

const { NODE_ENV, CONTEXT: NETLIFY_ENV = NODE_ENV } = process.env;

const config: GatsbyConfig = {
  siteMetadata: metaConfig,

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
      // https://www.gatsbyjs.com/plugins/gatsby-plugin-robots-txt/ 참고
      resolve: "gatsby-plugin-robots-txt",
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: "*" }],
          },
          "branch-deploy": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
          "deploy-preview": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
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
        name: "assets",
        path: "./assets",
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
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            // https://www.gatsbyjs.com/plugins/gatsby-remark-table-of-contents/ 마크다운 toc 생성 참고
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "Table of Contents",
              tight: false,
              ordered: false,
              fromHeading: 2,
              toHeading: 3,
              className: "table-of-contents",
            },
          },
          // https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/ 마크다운 코드블럭 하이라이팅 참고
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              escapeEntities: {},
            },
          },
          `gatsby-remark-autolink-headers`,
        ],
      },
    },
  ],
};

export default config;
