import React, { useEffect, useState } from "react";

import "./index.scss";

interface Props {
  html: string;
}
const PostToc = ({ html }: Props) => {
  const getHeaderElements = () => {
    const headers = document.querySelectorAll<HTMLHeadingElement>(
      ".markdown-body > h2, .markdown-body > h3"
    );
    return headers;
  };
  // IntersectionObserver
  // #링크로 페이지의 중간으로 이동해도 안읽은 주제는 활성화가 되지 않도록 구현하기 위함
  // https://heropy.blog/2019/10/27/intersection-observer/ 참고
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // entry로 해당 헤더에 맞는 toc 태그를 가져온다.
          const headerElement = entry.target;
          const toc = document.querySelectorAll(
            `.post-toc a[href*="${encodeURI(headerElement.id)}"]`
          );
          // 헤더가 보일 때 toc-active 클래스를 추가하여 toc를 활성화 시키고, (읽었다는 표시)
          // 헤더가 *안보이면서* 요소의 top이 음수가 아니면 뷰의 밑에 있다는 의미이므로 toc 비활성화 시킴
          if (entry.isIntersecting) {
            toc[0].classList.add("toc-active");
          } else if (0 < entry.boundingClientRect.top) {
            toc[0].classList.remove("toc-active");
          }
        });
      },
      {
        rootMargin: "0px 0px 0px 0px",
      }
    );
    // 헤더를 가져와서 관찰 시작
    const headers = getHeaderElements();
    headers.forEach((headerElement) => {
      observer.observe(headerElement);
    });
  }, []);

  return (
    <div className="post-toc" dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default PostToc;
