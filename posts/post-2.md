---
title: "Intersection Observer API - 요소의 가시성에 따른 작업처리"
date: "2022-05-20 22:51:00"
author: 이창우
tags: javascript
categories: javascript
---

## 가시성에 따른 작업이란?

블로그 개발 중 Toc(table of contents) 작업 도중에 가시성에 따른 처리가 필요하였다.
toc에 해당하는 실제 헤더 요소가 뷰포트에 나타날 때 toc의 스타일을 변경해 주는 것과 같은 작업을 의미한다.
이외에도 아래와 같은 작업에도 가시성에 따른 작업처리가 필요하다.

- 첫 렌더링을 빠르게 하기 위해 처음 보이는 부분을 제외한 나머지 부분의 이미지나 다른 컨텐츠를 lazy-loading 하는 경우
- 컨텐츠를 무한 스크롤 형식으로 구현하는 경우
- 광고 수익을 계산하기 위해 광고가 얼마나 보여 졌는지 확인하는 경우
- 사용자가 현재 화면이 보이는지 확인하여 다음 작업을 처리할 수 있는지 체크하는 경우

## 가시성에 따라 작업을 처리하는 방법

### 스크롤 이벤트 사용

스크롤 이벤트를 이용하여 요소의 위치를 계산하여 위치 값에 따라 작업을 처리한다.
**Element.getBoundingClientRect(): 요소를 뷰포트에서의 상대적인 위치값을 반환한다.**

하지만 스크롤 이벤트는 아래와 같은 문제점이 존재한다.

- 스크롤 이벤트는 조금만 스크롤을 해도 수백번씩 실행이 되기 때문에 성능저하 문제가 심각하다. \* **throttle 처리 필수** (해도 많다...)
- getBoundingClientRect는 정확한 상대값을 가져오기 위해 렌더링 큐에 쌓인 작업을 모두 처리한 뒤 실행하기 때문에
  스크롤 이벤트에 등록하면 많은 reflow가 발생된다. (브라우저는 최적화를 위해 작업을 쌓아두고 한번의 reflow로 처리하는 기능이 있음)

### Intersection Observer 사용

이 글의 주제인 Intersection Observer는 위와 같은 단점을 해결한 신뢰도가 높은 공식 API이다.
옵저버패턴을 이용하여 뷰포트와 감시중인 요소가 곂칠 때 콜백 함수를 실행한다. getBoundingClientRect의 문제를 해결하여
상대값을 가져올때 **비동기적으로** 실행하여 reflow를 발생시키지 않는다.

## 사용법

### 0. 인스턴스 생성 및 사용

```js
//  생성
const observer = new IntersectionObserver(callback:IntersectionObserverCallback, options: IntersectionObserverInit);

// 감시할 요소 등록
const el = document.getElementById("item");
observer.observe(el);
```

### 1. Options

```js
interface IntersectionObserverInit {
  root?: Element | Document | null; // 가시성을 확인하기 위한 뷰포트, null일 경우 기본값인 브라우저 뷰포트가 루트가 됨
  rootMargin?: string; // 루트 주변의 여백 ex) "20px 40% -20px 0px" (위, 오른쪽, 아래, 왼쪽)
  threshold?: number | number[]; // 콜백을 실행할 가시성의 백분율 ex) 요소의 50%를 통과할때만 감지하려면 0.5, (배열도 가능 [0, 0.25, 0.5 0.75, 1] - 25%마다 실행)
}
```

### 2. Callback

```js
interface IntersectionObserverCallback {
  (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
}

//ex)
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    // Each entry describes an intersection change for one observed
    // target element:
    //   entry.boundingClientRect - 요소의 사각형 정보를 반환 (Element.getBoundingClientRect와 달리 reflow 발생 X)
    //   entry.intersectionRatio - 현재 보여지고 있는 요소의 비율을 반환 (0.0 ~ 1.0)
    //   entry.intersectionRect - 요소의 현재 보여지고 있는 사각형의 정보를 반환
    //   entry.isIntersecting - 요소가 root와 교차하는지 여부를 반환
    //   entry.rootBounds - root요소의 사각형 정보를 반환
    //   entry.target - 타겟요소 반환
    //   entry.time - 요소의 교차가 발생한 시간을 반환
  });
};
```

### 3. Method

```js
const observer = new IntersectionObserver(callback, options);

observer.observe(el); // 해당 요소 관찰 시작
observer.unobserve(el); // 해당 요소 관찰 중지
observer.disconnect(); // 모든 요소의 관찰 중지
observer.takeRecords(); // IntersectionObserverEntry객체 배열을 반환
```

## 마치며

블로그의 toc를 처음에 간단하게 scroll값 과 useEffect를 이용하여 toc를 만든 후 최적화를 하다가
Intersection Observer API를 알게되었다. 확실히 스크롤 이벤트의 단점을 해결해 준다는 것을 느꼇고
앞으로 아주 적극적으로 Intersection Observer API를 사용할 것 같다.

## 참고

https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#specifications
https://heropy.blog/2019/10/27/intersection-observer/
