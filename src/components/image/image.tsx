import { graphql, useStaticQuery } from "gatsby";
import React, { useMemo } from "react";
import { GatsbyImage } from "gatsby-plugin-image";

interface Props {
  src: string;
  style?: {
    [props: string]: string | number;
  };
}
const Image = ({ src, ...rest }: Props) => {
  // assets 폴더를 탐색하여 relativePath 와 플러그인으로 생성한 childrenImageSharp를 가져온다.
  const { allFile } = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "assets" } }) {
        edges {
          node {
            relativePath
            extension
            publicURL
            childrenImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `);
  // assets폴더의 내용을 모두 가져오기 때문에 배열을 탐색하여 src와 일치한 객체를 가져온다.
  const image = useMemo(
    () => allFile?.edges.find(({ node }: any) => node.relativePath === src),
    [src, allFile]
  );
  if (!image) {
    return null;
  }

  const {
    node: { childrenImageSharp, publicURL },
  } = image;

  // childrenImageSharp 객체가 없다면 publicURL을 이용해 이미지 태그를 만들어준다.
  if (!childrenImageSharp) {
    return <img src={publicURL} alt={publicURL} {...rest} />;
  }

  return (
    <GatsbyImage
      image={childrenImageSharp[0].gatsbyImageData}
      alt={publicURL}
      {...rest}
    />
  );
};

export default Image;
