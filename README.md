# 랜선 떡볶이단 (mini project)

[시연 영상 보기]().

## 목차

1. 프로젝트 설명
2. 사용 패키지
3. 역할 분담
4. 에러 정리

## 프로젝트 설명
떡볶이 맛집을 소개하고 리뷰하는 커뮤니티

## 🛠Package
-State Management: redux, react-redux

-Style Work: styled-components

-Route: react-router-dom, connected-react-router

-Middleware: redux-thunk, redux-logger

-History: history

-Soket: socket.io, socket.io-client

## 💪역할 분담
이덕행 : 로그인, 회원가입, 메인 페이지, 입장 페이지

최정원 : 게시글 작성, 수정, 삭제

한유정 : 엘리먼트, 상세 페이지

공동작업 : 실시간채팅, CSS

## 🔎에러 정리
이덕행
1. 로그인 시 아이디 비번을 입력할 때 어떤 값을 넣어도 서버에서 토큰을 보내주는 문제 발생
=> Test API로 확인 했을 때 문제가 없어서 포스트 맨으로 확인 했을 때 서버에서 알려준 API가 문제가 있다는 것을 알게됨.
=> API 경로문제 / 문제 해결.

한유정
1. 메인페이지에서, 해당유저에게만 수정/제거버튼 노출
=> user_id와 props의 아이디를 각각 읽어오지 못해 발생하는 문제
=> 리덕스, 부모컴포넌트 요소 콘솔로그를 통해 확인하여 해결
2. PostDetail에서, 상세페이지 노출 시 uri와 post_id매칭안되는 문제
=> 엄격한 비교를 유형변환비교로 변경하여 해결

최정원
1. 이미지 수정 미들웨어 작성 시 axios가 전혀 발생하지 않은 문제 발생
formData 가 get/post에만 적용된다는 것을 발견하고 기존 method였던 patch -> post로 변경. 

공동작업
1. 소켓 기능 구현 시 백엔드와 연결이 되지 않았음
=> 프론트쪽에 백엔드 서버 주소를 제대로 넣지 않아 생겼던 문제였음.
