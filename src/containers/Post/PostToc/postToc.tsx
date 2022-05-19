import React, { useEffect, useState } from "react";
import useScroll from "../../../hooks/useScroll";

import "./index.scss";

interface Props {
  html: string;
  headers: any[];
}
const PostToc = ({ html, headers }: Props) => {
  const { y } = useScroll();
  const [active, setActive] = useState(0);

  const getTocElements = () => {
    const toc = document.querySelectorAll<HTMLLinkElement>(
      ".post-toc > ul li a"
    );
    return toc;
  };
  // 요소.offsetTop - height : 요소까지의 스크롤 거리가 나옴
  // +180은 요소를 어느정도 보여준뒤 인덱스를 바꾸기 위해 추가함
  useEffect(() => {
    const height = window.innerHeight;
    headers.forEach((header: HTMLHeadingElement, i: number) => {
      //   console.log(header.offsetTop - height, y);

      if (header.offsetTop - height + 400 < y) {
        setActive(i);
      }
    });
  }, [y]);

  // index가 바뀌면 toc의 a태그에 클래스를 주어 스타일을 변화시킴
  useEffect(() => {
    const toc = getTocElements();

    for (let i = 0; i < toc.length; ++i) {
      if (active === i) toc[i]?.classList.add("active");
      else toc[i]?.classList.remove("active");
    }
  }, [active]);

  // toc에 클릭이벤트를 추가해줌
  useEffect(() => {
    const toc = getTocElements();
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
    <div className="post-toc" dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default PostToc;
