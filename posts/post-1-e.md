---
title: "[mini-css-extract-plugin] Conflicting order 에러"
date: "2021-05-12 19:00:00"
author: 이창우
tags: gatsby
categories: gatsby webpack error-fix
---

## 🔥 문제 발생

블로그 개발 중 아래와 같은 문제를 만났다.

```
warn chunk commons [mini-css-extract-plugin]
Conflicting order. Following module has been added:
 * css ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[10].o
neOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[3]!./src/components/header/index.scss
```

## 🔌 발생 원인

웹팩이 빌드될때 프로젝트 파일 구조에 따라 (import한 순서) css 파일을 덮어 씌우며 하나의 css번들 파일을 만들게 되는데
웹팩 플러그인이 컴포넌트를 import한 순서와 사용 된 순서가 일치하기를 기대하기 때문에 순서 충돌 경고메시지를 보여주게된다.

- **css 모듈(.module.css, styled-components 등)을 사용할 경우 컴포넌트 별로 고유한 className을 만들어 주기 때문에 순서가 중요하진 않음**

## 🚒 해결 방법

### 1. import 순서와 컴포넌트 사용순서를 맞춰준다.

**잘못된 예**

```
import Footer from "../components/footer/footer";
import Header from "../components/header/header";

import "./index.scss";

<div className="page-wrapper">
    <Header/>
    <main>{children}</main>
    <Footer/>
</div>
```

**옳은 예**

```
import "./index.scss";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

<div className="page-wrapper">
    <Header/>
    <main>{children}</main>
    <Footer/>
</div>
```

### 2. 웹팩의 MiniCssExtractPlugin 설정 수정 (css 모듈을 사용 할 경우)

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

plugins: [
   new MiniCssExtractPlugin({
       ignoreOrder: true
    })
]
```

### 3. 웹팩 플러그인을 사용하여 오류메시지를 필터 (css 모듈을 사용 할 경우)

```
// 설치
npm i webpack-filter-warnings-plugin

// 웹팩에 추가
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");

plugins: [
    new FilterWarningsPlugin({
    exclude:
        /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/,
    }),
]

*** Gatsby에서는 아래와 같이 사용가능 *** (2번도 동일)
// gatsby-node.js
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new FilterWarningsPlugin({
        exclude:
          /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/,
      }),
    ],
  });
};
```

## 🐤 마치며

- 필자는 css 모듈을 사용하지 않고 컴포넌트마다 컴포넌트이름-wrapper class로 감싸서 모듈처럼 사용하고 있기 때문에
  2번 또는 3번 방법을 택하려 했지만 아직 컴포넌트 구조도 단순하고 1번 방식으로 충분해 보여서 1번으로 해결했다.

```toc

```
