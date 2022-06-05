---
title: "Github 파일 대소문자 변경 오류"
date: "2022-06-05 20:00:00"
author: 이창우
tags: github
categories: github error-fix
---

## 🔥 문제 발생

현재 블로그가 Netlify로 배포되고있는데 빌드문제가 발생했다.

```js
failed Building production JavaScript and CSS bundles - 16.606s
5:36:14 AM: error Generating JavaScript bundles failed
5:36:14 AM: Can't resolve '../Header/header' in '/opt/build/repo/src/components/Layout'
5:36:14 AM: If you're trying to use a package make sure that '../Header/header' is installed. If you're trying to use a local file make sure that the path is correct.
5:36:14 AM: error Generating JavaScript bundles failed
5:36:14 AM: Can't resolve '../Footer/footer' in '/opt/build/repo/src/components/Layout'
5:36:14 AM: If you're trying to use a package make sure that '../Footer/footer' is installed. If you're trying to use a local file make sure that the path is correct.
5:36:14 AM: error Generating JavaScript bundles failed
...

```

## 🔌 발생 원인

메시지를 보니까 파일을 찾지 못하는 것 같은데 파일정리를 하면서 폴더나 파일명을 대소문자로 변경한 경우 github에 반영이 안되는게 문제였다.
파일에선 ../Header/header 를 import 했는데 github상에선 /header/header로 되어있어서 배포할 시 파일을 못찾는 것이다.

## 🚒 해결 방법

### 방법 1

git mv 명령어 사용

```js
git mv oldFileName newFileName
git mv -f oldFileName newFileName // 오래된 git 버전에선 -f를 붙여주어야한다.
```

### 방법 2 (여러개의 폴더명만 바꿨을때 사용)

github의 기본설정이 대소문자 구분을 하지 않음으로 되어있어서 설정을 변경해 주어야한다.

```js
// 대소문자를 구분하도록 설정
git config core.ignorecase false
// git 캐시 삭제 후 커밋
git rm -r --cached .
git add .
git commit -m ""
git push origin main
// 다시 설정을 되돌려줌
git config core.ignorecase true
```

이후 커밋을 하면 아래와 같이 정상적으로 폴더명이 변경된다.

```js
git add .
git commit -m ""
 8 files changed, 0 insertions(+), 0 deletions(-)
 rename src/components/{footer => Footer}/footer.tsx (100%)
 rename src/components/{footer => Footer}/index.scss (100%)
 rename src/components/{header => Header}/header.tsx (100%)
 rename src/components/{header => Header}/index.scss (100%)
 rename src/components/{image => Image}/image.tsx (100%)
 rename src/components/{seo => Seo}/seo.tsx (100%)
```

### 주의할점

**파일명을 바꿨을때 방법2를 사용하게 되면 문제가 발생한다.**

- 기본적으로 window와 os x 파일시스템은 대소문자를 구분하지 않는다.
- 따라서 폴더는 문제 없지만 파일이름을 변경하면 깃에서 중복 파일을 생성하여 여러 문제가 발생하게 된다. (clone이나 pull시 파일 하나만 인식하는 등)

## 🐤 마치며

처음에는 git config core.ignorecase false 설정으로 완전히 해결한줄 알았지만
왜 깃에선 이러한 설정을 넣어뒀을까란 궁금증에 계속 구글링을 해본결과 os의 파일시스템과 연결되어 여러 오류를
발생시킬 수 있기 때문에 이를 막기 위하여 위 설정을 넣어둔 것을 알게되었다.

- 따라서 여러개의 폴더명의 대소문자를 바꾼게 아니라면 git mv 명령어를 이용하자
