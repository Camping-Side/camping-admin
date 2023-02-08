# front-admin

## 1. 주제

- [front-client](https://github.com/Camping-Side/camping-client)의 어드민 페이지이다.
- [Material Kit - React](https://material-kit-react.devias.io/)을 활용해 구성한다.

## 2. 라이브러리

- Material Kit - React 내장
  - React 18
  - next.js
  - 이모션
  - mui
  - chart.js
  - eslint
- ts
- redux-toolkit

## 3. 폴더 구조

```bash

┌── api                 : api 요청/응답 관련 모듈
│   ├── index           : 외부에서 사용할 모듈
│   ├── other folder    : 내부 모듈
├── assets              : 배포시 포함시킬 리소스
│   ├── fonts           : 폰트 관련
│   ├── icon            : 아이콘 관련
│   ├── style           : 스타일 관련
│   └── ts              : 상수나 공통 함수, 유틸리티 폴더
│        └── common
│        └── const      : 상수
├── components          : 공통 component 관리
├── layout              : layout 폴더
├── pages               : page 단위의 component 폴더
├── reducers            : reducer를 위한 폴더
├── stories             : storybook을 위한 폴더
├── package.json        : 설치된 라이브러리/패키지 정보
├── README.md
├── next.config.js
├── tsconfig.json       : typescript 설정 파일
├── public              : Material Kit - React 정적 파일(⚠ 추후 제거 필요)
└── src_template        : Material Kit - React 코드(⚠ 추후 제거 필요)
```

## 4. 빌드

⚠ 주의 사항
- `npm` 버전이 16이상일 경우만 정상적으로 동작한다.
  - [axis issue](https://github.com/axios/axios/issues/5221#issuecomment-1316173282)

### 최초 빌드

최초 빌드시 아래의 명령을 사용해 모듈을 다운 받을 수 있다.

- `npm install`

이후 목적에 따라 아래의 커맨드를 사용한다.

### 개발용 빌드

`npm run dev`

### 템플릿 빌드(⚠ 추후 제거 필요)

`npm run dev:template`

### 확인 방법

위의 개발용 빌드의 command를 입력하면 기본적으로 `localhost:3000`로 확인할 수 있지만, 이미 `3000`포트를 사용중인 경우엔 다른 포트로 확인해야 할 수도 있다.

## 5. Storybook

Storybook을 사용해 각 컴포넌트를 확인하고 테스트 할 수 있다.

### 서버 띄우기

`npm run storybook` 명령어 실행시 6006포트에 스토리 북 서버가 실행된다.

### 스토리 작성

stories 폴더 내 `*.stories.tsx` 파일을 생성해 각 스토리를 작성할 수 있다.
- 참고
  - 예제 : `stories/AddForm.stories.tsx`
  - 스토리 작성 방법 : https://storybook.js.org/docs/react/writing-stories/introduction

### 테스트 작성

stories 폴더 내 `*.stories.tsx` 파일에서 스토리의 `play` 기능을 사용해 테스트할 수 있다.

- 참고
  - 예제 : `stories/AddForm.stories.tsx`
  - 스토리 테스트 방법 : https://storybook.js.org/docs/react/writing-tests/introduction
