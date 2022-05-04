import React, { useEffect, useState } from "react";
import useScroll from "../../hooks/useScroll";

import "./index.scss";

interface Props {
  html: string;
}
const PostContent = ({ html }: Props) => {
  const { y } = useScroll();
  const [headers, setHeaders] = useState<any>([]);
  const [active, setActive] = useState(0);

  // toc 된 h2, h3 요소를 저장한다.
  useEffect(() => {
    setHeaders(
      document.querySelectorAll<HTMLHeadingElement>(
        ".markdown-body > h2, .markdown-body > h3"
      )
    );
  }, []);
  // 요소.offsetTop - height : 요소까지의 스크롤 거리가 나옴
  // +180은 요소를 어느정도 보여준뒤 인덱스를 바꾸기 위해 추가함
  useEffect(() => {
    const height = window.innerHeight;
    headers.forEach((header: HTMLHeadingElement, i: number) => {
      //   console.log(header.offsetTop - height, y);

      if (header.offsetTop - height + 180 < y) {
        setActive(i);
      }
    });
  }, [y]);

  // index가 바뀌면 toc의 li태그에 클래스를 주어 스타일을 변화시킴
  useEffect(() => {
    const toc = document.querySelectorAll<HTMLLIElement>(
      ".table-of-contents > ul li a"
    );
    for (let i = 0; i < toc.length; ++i) {
      if (active === i) toc[i]?.classList.add("active");
      else toc[i]?.classList.remove("active");
    }
  }, [active]);

  useEffect(() => {
    const toc = document.querySelectorAll<HTMLLIElement>(
      ".table-of-contents > ul li a"
    );
    const onClick = (idx: number) => {
      setActive(idx);
    };

    for (let i = 0; i < toc.length; ++i) {
      toc[i].addEventListener("click", () => onClick(i));
    }
    return () => {
      for (let i = 0; i < toc.length; ++i) {
        toc[i].removeEventListener("click", () => onClick(i));
      }
    };
  }, []);

  return (
    <div className="post-content-wrapper">
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default PostContent;
