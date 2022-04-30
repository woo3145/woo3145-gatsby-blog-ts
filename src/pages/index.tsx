import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../layout";
import Bio from "../components/bio/bio";
import PostList from "../components/post-list/post-list";
import Post from "../models/post";
import { getUniqueCategories } from "../utils/helpers";

interface DataProps {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  allMarkdownRemark: {
    edges: {
      node: MarkdownRemarkNode;
    }[];
  };
}

const IndexRoute = ({
  data: { site, allMarkdownRemark },
  path,
}: PageProps<DataProps>) => {
  const posts = allMarkdownRemark.edges.map(({ node }) => {
    return new Post(node);
  });
  const categories = ["All", ...getUniqueCategories(posts)];
  const [tabIdx, setTabIdx] = React.useState(0);
  const onTabIdxChange = (idx: number) => setTabIdx(idx);

  return (
    <Layout>
      <Bio />
      <PostList
        posts={posts}
        categories={categories}
        tabIdx={tabIdx}
        onTabIdxChange={onTabIdxChange}
      />
    </Layout>
  );
};

export default IndexRoute;

export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          id
          excerpt(pruneLength: 500, truncate: true)
          html
          frontmatter {
            author
            categories
            date(formatString: "MMMM DD, YYYY")
            tags
            title
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
