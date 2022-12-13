# front-five

사이드프로젝트

애자일로 간다.
모임 날짜 매주 토요일 오전

1. 주제

- 캠핑 커뮤니티 + EC

2. 라이브러리

- [Material Kit - React](https://material-kit-react.devias.io/)
  - React 18
  - next.js
  - 이모션
  - mui
  - chart.js
  - eslint

## 폴더 구조

```
bash
┌── .env.example
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── README.md
├── public
└── src
	├── __mocks__
	├── components
	├── icons
	├── lib
	├── theme
	├── utils
	└── pages
		├── 404.js
		├── _app.js
		├── _document.js
		├── account.js
		├── customers.js
		├── index.js
		├── index.js
		├── products.js
		├── register.js
		└── settings.js
		└── sign-in
			├── confirm.js
			└── index.js
```

## 빌드

### 최초 빌드

최초 빌드시 아래의 명령을 사용해 모듈을 다운 받아야합니다.

- `npm install`

### 개발용 빌드

command : `npm run dev`

### 확인 방법

위의 개발용 빌드의 command를 입력하면 기본적으로 `localhost:3000`로 확인할 수 있지만, 이미 `3000`포트를 사용중인 경우엔 다른 포트로 확인해야할 수도 있다.
