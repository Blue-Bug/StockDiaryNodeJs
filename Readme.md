# StockDiary
간단한 주식일지를 쓰고 DB에 저장하거나 엑셀로 내려받을 수 있는 웹 어플리케이션

## 구현 기능
### 1. 간단하게 공지사항을 쓰고 확인하고 삭제할 수 있는 기능
![공지사항](https://user-images.githubusercontent.com/46710160/132120685-7faf257b-333c-4e94-a852-e7ddb329f309.JPG)

### 2. 주식일지를 쓰고 데이터베이스에 저장해서 조회하거나 엑셀로 내려받을 수 있는 기능
![일지리스트](https://user-images.githubusercontent.com/46710160/132120691-665d0537-9dbf-4473-b685-78311d0294d2.JPG)
![일지 조회](https://user-images.githubusercontent.com/46710160/132120689-a6b25198-a8ad-453b-b17a-568f9af6575a.JPG)
![캡처](https://user-images.githubusercontent.com/46710160/132120688-e5ebf132-b045-4f57-9fb1-6770a75cf0b7.JPG)

### 3. 지금까지 쓴 일지 개수와 최근 접속시간을 확인할 수 있는 대시보드와 <br>프로필에서 이름을 간단하게 수정할 수 있는 기능
![대시보드](https://user-images.githubusercontent.com/46710160/132120820-8f57c656-49df-4bb1-ade5-19de87b3c6e7.JPG)
![프로필](https://user-images.githubusercontent.com/46710160/132120692-d2fb972f-bdc1-44bb-ab8c-9b449861c4a7.JPG)

## 패스포트 모듈 사용
1. passport와 passport-local 전부 설치해야 로컬 스트래티지 사용가능
2. express-session 미들웨어 사용 선언 후에 passport 미들웨어 사용선언 해야함 
    - app.use(passport.initialize());  
    - app.use(passport.session());  
    - app.use(flash());  
3. 모듈화 시킬때 local_login.js와 local_signup.js에서 database에 접근할 수  있게 app 객체 넘겨주기
4. 페이스북은 https가 아니면 소셜 로그인 불가능
5. 구글은 id 대신 sub을 사용하여 저장(둘은 같은 값)
