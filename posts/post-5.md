---
title: "ScriptProcessorNode & AudioWorkletNode의 차이"
date: "2022-06-19 17:15:00"
author: 이창우
tags: audio
categories: audio javascript waiting-for-support
---

## 🔥 문제 발생

WaveSurfer.js 사용중 크롬에 자꾸 아래와 같은 경고가 찍혔다.

```js
The ScriptProcessorNode is deprecated. Use AudioWorkletNode instead.
```

## 분석

아래의 wavesurfer.js의 소스코드를 보면 wavesurfer.create로 객체를 만들면서 오디오를 처리 할 객체를 만드는데 ScriptProcessorNode 인터페이스를 사용하고 있다.
하지만 웹 표준에서 ScriptProcessorNode를 AudioWorkletNode 인터페이스로 대체했기 때문에 브라우저에서 경고 표시를 보내주는 것이다.
(2014년 8월 29일에 WebAudio API 사양 명세서가 발행됨)

```js
 //... wavesurfer.js/webaudio.js

 /** Create ScriptProcessorNode to process audio */
    createScriptNode() {
        if (this.params.audioScriptProcessor) {
            this.scriptNode = this.params.audioScriptProcessor;
        } else {
            if (this.ac.createScriptProcessor) {
                this.scriptNode = this.ac.createScriptProcessor(
                    WebAudio.scriptBufferSize
                );
            } else {
                this.scriptNode = this.ac.createJavaScriptNode(
                    WebAudio.scriptBufferSize
                );
            }
        }
        this.scriptNode.connect(this.ac.destination);
    }
```

## 오디오 처리 인터페이스

레거시 방식인 ScriptProcessorNode와 현재 웹표준인 AudioWorkletNode 가 존대한다.자바스크립트로 오디오를 처리하기 위해 사용하는 인터페이스이다.
여러 오디오 작업을 처리할 수 있는데 예를들어 delay나 compressor오디오 모듈을 connect하여 이펙터 효과를 구현할 수 있다.

### ScriptProcessorNode의 특징

- 브라우저의 메인스레드를 사용함 (사용자의 상호작용에 의해 오디오가 끊김을 유발할 수 있다.)
- 구현을 브라우저 자체에 맡겨서 브라우저 마다 일관적이지 않은 결과를 만들 수 있다.
- 이중으로 버퍼링 되기 때문에 지연시간이 증가한다.
- DOM에 접근할 수 있기때문에 잘못 사용하면 초당 수백번씩 수정될수도 있다.

### AudioWorkletNode의 특징

- 브라우저의 메인스레드 대신 audioRender 스레드를 사용한다.
- 명세서 표준을 따르기 때문에 브라우저 환경이 바뀌어도 일관적일 수 있다.
- 특수 스레드(audio render thread)에서 실행되기 때문에 사용이 좀더 어렵다
  - 새클래스를 만들어 등록시켜 주어야함
  - dom 조작이 안되기 때문에 portMessage로 다루어야한다.

## 지원 대기

현재 아래의 깃허브 이슈에서 트래킹 되고 있다.
https://github.com/katspaugh/wavesurfer.js/issues/1281

## 마치며

wavesurfer를 직접 마이그레이션 해보려했지만 너무어려워서 포기했다...
그래도 하루종일 삽질하면서 Web Audio API에 발을 담가보게 되었다. 다음 토이 프로젝트는 Web Audio API로 클린기타 사운드에 이펙터를 입히면서 더 깊이 파보아야 겠다.
