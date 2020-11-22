# Typing Game

> A repository for Typing Game

## Install dependencies

```shell
npm install
```

## Build

```shell
npm run build
```

## Start

```shell
npm run start
```

## Test

```shell
npm run test
```

## Solution

1. index.html document가 로딩이 완료 된 후 서버에서 데이터를 가져와 Singleton App 인스턴스를 생성하고 앱을 구동시킨다.
2. App constructor에서 event 핸들러를 등록하고 UI와 멤버변수들을 초기화 시킨다.
3. '시작'버튼을 클릭하면 startGame()이 호출된다. (UI변경과 time remains를 interval의 cb으로 1초마다 갱신하여 보여준다.)
4. 단어를 입력하는 input창에는 엔터 입력시 change 이벤트가 발생되어 문제단어와 match()를 하게 된다.
5. match시 일치한다면 next() 결과에 따라 다음단어를 보여주거나 결과 페이지로 넘어간다.

## Support

_Sunhee Kyung_ (@shkyung)
