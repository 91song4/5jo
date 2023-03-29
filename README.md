# **:facepunch: Final Project - Glamping**

**<h2>글램핑이란?</h2>**

글램핑은 '화려한' 또는 '매력적'이라는 뜻을 지닌 'glamorous'와 'camping'을 합친 신조어이다. 이름 그대로 화려한, 즉 럭셔리한 캠핑을 뜻한다.

<br/>

**<h2>저희는 뻔한 글램핑이라는 단어가 아닌 좀 더 나은 이름으로 발전시켰습니다.</h2>**
**<h2>~~글래머와 캠핑~~ :exclamation::exclamation:</h2>**

<br/>

<h3>캠핑을 즐기는 사람들을 위한 곳이며, 의류를 제외한 모든것을 제공합니다</h3>
<h3>또한, 저희는 아주 특별한 경험을 제공합니다. 다른 어떤 곳에서도 하지못한 경험이요!!</h3>

<br/>
<br/>

# **:handbag: Service**

![image](https://user-images.githubusercontent.com/59003470/225533442-6d8fa71e-e311-4015-aaad-b6833ef8e8ed.png)

---

<br/>

**:one: 회원가입을 하면 할인 쿠폰을 준다고? - 미구현**

```
→ 회원가입 시 할인 쿠폰 증정
→ 소셜로그인 시 할인 쿠폰 x
→ 회원가입을 진행하고, 생일을 입력했다면 생일에 할인구폰 증정
```

**:two: 채팅 기능으로 실시간 대화 가능**

```
→ 실시간 채팅 탭을 통하여 관리자 및 접속중인 회원들과 자유롭게 대화 가능
→ 관리자 또한 채팅방 참여 가능. 관리자는 이름이 붉게 표시되는걸로 알 수 있어요!
```

**:three: 리뷰 작성만 해도 또 할인쿠폰이 생긴다구? - 미구현**

```
→ 예약 한번 당 리뷰 1회 작성 가능
→ 한번도 캠핑장을 이용하지 않은 고객은 당연히 리뷰를 작성할 수 없습니다
```

**:four: 문의는 DM으로 부탁드려요 :pray::pray:**

```
→ 우리는 모두 소중한 하나의 인격체니까 소중히 대해주세요
→ 기본적인 예의를 지켜주셔야 바른 답변을 받아보실 수 있습니다
```

<br/>

# :runner: **팀원 및 역할 분담**

- **이진석**

```
- 주문 API CRUD
- ReservaionCalendar GET API 및 비즈니스 로직 (미완)
- 힘내라 힘 담당
```

- **송지훈**

```
- 회원가입, 회원탈퇴, 로그인, 로그아웃
- 아이디 찾기, 비밀번호 찾기, 비밀번호 재설정
- 검증 미들웨어
- RedisCloud
- Twilio
- migration
- 실시간채팅
- Amazon EC2, RDS, S3, CloudFront
```

- **유상우**

```
- 캠프 정보 생성, 조회, 상세조회, 수정, 삭제 API
- 관리자페이지 기본 틀 / 캠프 프론트
- 메인페이지 / 마이페이지 / 헤더 등 프론트 전반
- 로컬 패스포트 및 jwt 패스포트
- 소셜 로그인 / 회원가입 API
```

- **이호승**

```
- 유저 정보 생성, 조회, 상세조회, 수정, 삭제 API 담당
- 유저 정보 관리할 수 있는 관리자 페이지 프론트
- 결제 주문 내역 조회 가능한 관리자 페이지 프론트
- 유저 정보 조회 및 결제 주문 내역 조회 페이지네이션
```

- **김재원**

```
- 리뷰 조회, 상세조회, 작성, 수정, 삭제 API 담당
- 리뷰 작성하는 프론트 페이지
- 캠핑 이용후기 커뮤니티 프론트 페이지
- 캠핑 이용후기 커뮤니티 프론트 페이지네이션
- 리뷰 등록시 쿠폰 지급

```

<br/> <br/>

# :file_folder: **사용 도구**

<div> <!-- 프론트 -->
  <!-- HTML -->
	<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <!-- CSS -->
	<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <!-- JS -->
	<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <!-- JQuery -->
	<img src="https://img.shields.io/badge/jquery-0769AD?style=for-the-badge&logo=jquery&logoColor=white">
  <!-- bootstrap -->
	<img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
  <!-- ejs -->
	<img src="https://img.shields.io/badge/ejs-ED2B88?style=for-the-badge&logo=EJS&logoColor=white">
  <!-- Ajax -->
	<img src="https://img.shields.io/badge/ajax-FF6B00?style=for-the-badge&logo=AJax&logoColor=white">
  <!-- Axios -->
	<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
<br/> <!-- 백엔드 -->
  <!-- Node.JS -->
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=black">
  <!-- Nest.JS -->
  <img src="https://img.shields.io/badge/nest.js-E0234E?style=for-the-badge&logo=nestjs&logoColor=black">
  <!-- MySQL -->
	<img src="https://img.shields.io/badge/mySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
  <!-- TypeORM -->
	<img src="https://img.shields.io/badge/typeorm-52B0E7?style=for-the-badge&logo=TypeORM&logoColor=white">
  <!-- Socket.IO -->
	<img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=Socket.IO&logoColor=white">
<br/> <!-- 데브옵스 -->
  <!-- amazon EC2 -->
	<img src="https://img.shields.io/badge/Amazonec2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=white">
  <!-- amazon RDS -->
	<img src="https://img.shields.io/badge/AmazonRDS-527FFF?style=for-the-badge&logo=Amazon RDS&logoColor=white">
  <!-- amazon S3 -->
	<img src="https://img.shields.io/badge/AmazonS3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
  <!-- amazon CloudFront -->
	<img src="https://img.shields.io/badge/AmazonCloudFront-7F2B7B?style=for-the-badge&logo=Amazon CloudFront&logoColor=white">
  <!-- amazon Certificate Manager -->
	<img src="https://img.shields.io/badge/AWSCertificateManager-FFDC0F?style=for-the-badge&logo=AWS Certificate Manager&logoColor=white">
  <!-- amazon Gabia -->
	<img src="https://img.shields.io/badge/Gabia-3EAAAF?style=for-the-badge&logo= Gabia&logoColor=white">
  <!-- RedisCloud -->
	<img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white">
  <!-- Twilio -->
	<img src="https://img.shields.io/badge/twilio-F22F46?style=for-the-badge&logo=Twilio&logoColor=white">
<br/> <!-- 툴 -->
  <!-- git -->
	<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <!-- github -->
	<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <!-- vsc -->
	<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white">
</div>

- Front
  - HTML5
  - CSS3
  - Javascript (ES6)
  - Jquery
  - Bootstrap
  - ejs
  - Ajax
  - Axios
- Back
  - Node.js (Nest.JS)
  - MySQL (TypeORM)
  - Socket.IO
- DevOps
  - Amazon EC2
  - Amazon RDS
  - Amazon S3
  - Amazon CloudFront
  - AWS Certificate Manager
  - Gabia
  - RedisCloud
  - Twilio
- Tools
  - Git
  - GitHub 
  - VSCode

<br/>
<br/>

# :art: **Dependencies**

```json
"dependencies": {
    "@fullcalendar/core": "^6.1.4",
    "@fullcalendar/daygrid": "^6.1.4",
    "@nestjs/common": "^9.0.0",
    "@nestjs/config": "^2.3.1",
    "@nestjs/core": "^9.0.0",
    "@nestjs/jwt": "^10.0.2",
    "@nestjs/mapped-types": "^1.2.2",
    "@nestjs/passport": "^9.0.3",
    "@nestjs/platform-express": "^9.0.0",
    "@nestjs/platform-socket.io": "^9.3.9",
    "@nestjs/swagger": "^6.2.1",
    "@nestjs/typeorm": "^9.0.1",
    "@nestjs/websockets": "^9.3.9",
    "@types/passport-local": "^1.0.35",
    "axios": "^1.3.4",
    "bcrypt": "^5.1.0",
    "bootstrap": "^5.3.0-alpha1",
    "cache-manager": "^5.1.7",
    "cache-manager-ioredis": "^2.1.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.0.3",
    "ejs": "^3.1.8",
    "joi": "^17.8.3",
    "lodash": "^4.17.21",
    "mysql": "^2.18.1",
    "mysql2": "^2.3.3",
    "nestjs-twilio": "^4.1.1",
    "passport": "^0.6.0",
    "passport-google-oauth20": "^2.0.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.2.0",
    "socket.io": "^4.6.1",
    "source-map-support": "^0.5.21",
    "typeorm": "^0.3.11"
  }
```

<br/>
<br/>

# :books: **API 명세서**

Link :
[API 명세](https://docs.google.com/spreadsheets/d/1VTCCrGzwz5bIT9pm_W17TBL7Gg0zT7C_3zSC19IgbRw/edit#gid=0)

<br/>
<br/>

# :scroll: **branch 전략**

- 배포 브랜치 : master
- 개발 브랜치 : dev
- 기능별 브랜치 : feature/
- 수정 브랜치 : fix/
- 디자인 브랜치 : design/
- 테스트 브랜치 : tests/

<br/>
<br/>

# :open_file_folder: **폴더 구조**

```
📦
src
├── admin
│   ├── admin.controller.spec.ts
│   ├── admin.controller.ts
│   ├── admin.entity.ts
│   ├── admin.module.ts
│   ├── admin.service.spec.ts
│   └── admin.service.ts
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── auth
│   ├── auth-status-validation.pipe.ts
│   ├── auth.controller.spec.ts
│   ├── auth.controller.ts
│   ├── auth.middleware.ts
│   ├── auth.module.ts
│   ├── auth.service.spec.ts
│   ├── auth.service.ts
│   ├── dtos
│   │   ├── create-social-user.dto.ts
│   │   ├── create-user.dto.ts
│   │   ├── find-user-id.dto.ts
│   │   ├── find-user-password.dto.ts
│   │   ├── get-user-select.dto.ts
│   │   ├── login-user.dto.ts
│   │   ├── reset-password.dto.ts
│   │   └── send-sms.dto.ts
│   ├── jwt-authentication.guard.ts
│   ├── jwt-social-google.strategy.ts
│   ├── jwt.strategy.ts
│   ├── local.strategy.ts
│   ├── localAuthentication.guard.ts
│   ├── question.md
│   ├── requestWithUser.interface.ts
│   ├── routes.rest
│   ├── social.login.interface.ts
│   └── tokenPayload.interface.ts
├── camp
│   ├── camp.controller.spec.ts
│   ├── camp.controller.ts
│   ├── camp.entity.ts
│   ├── camp.module.ts
│   ├── camp.repository.ts
│   ├── camp.service.spec.ts
│   ├── camp.service.ts
│   └── dto
│       ├── create-camp.dto.ts
│       ├── delete-camp.dto.ts
│       └── update-camp.dto.ts
├── config
│   ├── cache.config.service.ts
│   ├── jwt.config.service.ts
│   ├── migration.config.ts
│   ├── orm.config.ts
│   ├── seed.config.ts
│   └── typeorm.config.service.ts
├── coupon
│   ├── coupon.controller.spec.ts
│   ├── coupon.controller.ts
│   ├── coupon.entity.ts
│   ├── coupon.module.ts
│   ├── coupon.service.spec.ts
│   ├── coupon.service.ts
│   └── dto
│       ├── create-coupon.dto.ts
│       └── update-coupon.dto.ts
├── events
│   ├── chat.gateway.ts
│   ├── events.module.ts
│   └── reserve.gateway.ts
├── main.ts
├── migrations
│   ├── 1677675287152-create-users-table.ts
│   ├── 1677687423535-create-Coupons-table.ts
│   ├── 1677688173285-create-Users_Coupons_Mapping-table.ts
│   ├── 1677691103047-create-Orders-table.ts
│   ├── 1677693883059-create-Camps-table.ts
│   ├── 1677695132690-create-Orders-foreignkeys.ts
│   ├── 1677696522790-create-Reservation_Calendar-table.ts
│   ├── 1677696898612-create-Reservation_Calendar-foreignkey.ts
│   ├── 1677697706932-create-Reviews-table.ts
│   ├── 1677698117174-create-Reviews-foreignkey.ts
│   ├── 1678280985133-change-Users-column.ts
│   ├── 1678281006373-create-Admins-table.ts
│   └── 1678281022713-create-Admins-foreignkey.ts
├── order
│   ├── dto
│   │   ├── create-order.dto.ts
│   │   ├── order-res.dto.ts
│   │   └── update-order.dto.ts
│   ├── order.controller.spec.ts
│   ├── order.controller.ts
│   ├── order.entity.ts
│   ├── order.module.ts
│   ├── order.service.spec.ts
│   └── order.service.ts
├── public
│   ├── css
│   │   ├── bootstrap.css
│   │   ├── chatting.css
│   │   ├── management.css
│   │   ├── responsive.css
│   │   ├── style.css
│   │   ├── style.css.map
│   │   └── style.scss
│   ├── fonts
│   │   ├── Poppins
│   │   │   ├── OFL.txt
│   │   │   ├── Poppins-Bold.ttf
│   │   │   └── Poppins-Regular.ttf
│   │   └── ethnocentric
│   │       ├── ethnocentric rg it.ttf
│   │       ├── ethnocentric rg.ttf
│   │       ├── read-this.html
│   │       └── typodermic-eula-02-2014.pdf
│   ├── images
│   │   ├── about.jpg
│   │   ├── camp_A.jpg
│   │   ├── camp_B.jpg
│   │   ├── campphoto1.jpg
│   │   ├── client.png
│   │   ├── contact-bg.jpg
│   │   ├── envelope-white.png
│   │   ├── herbal-white.png
│   │   ├── herbal.png
│   │   ├── hero.jpg
│   │   ├── info-bg.jpg
│   │   ├── info-logo.png
│   │   ├── location-white.png
│   │   ├── logo.png
│   │   ├── map_1.jpg
│   │   ├── menu.png
│   │   ├── next.png
│   │   ├── p-1.jpg
│   │   ├── p-2.jpg
│   │   ├── p-3.jpg
│   │   ├── p-4.jpg
│   │   ├── prev.png
│   │   ├── search-icon.png
│   │   ├── telephone-white.png
│   │   ├── why-img.jpg
│   │   ├── 캠핑장.png
│   │   └── 문의사항은DM으로.png
│   └── js
│       ├── bootstrap.js
│       ├── jquery-3.4.1.min.js
│       ├── main.js
│       ├── management.js
│       └── mypage.js
├── reservation_calendar
│   ├── reservation_calendar.controller.spec.ts
│   ├── reservation_calendar.controller.ts
│   ├── reservation_calendar.entity.ts
│   ├── reservation_calendar.module.ts
│   ├── reservation_calendar.service.spec.ts
│   └── reservation_calendar.service.ts
├── review
│   ├── create-article.dto.ts
│   ├── delete-article.dto.ts
│   ├── review.controller.spec.ts
│   ├── review.controller.ts
│   ├── review.module.ts
│   ├── review.service.spec.ts
│   ├── review.service.ts
│   └── update-article.dto.ts
├── seeds
│   ├── 1677703338397-Users-seed.ts
│   ├── 1678281308017-Admins-seed.ts
│   └── 1678359006600-Camps-seed.ts
├── sms
│   ├── sms.module.ts
│   ├── sms.service.spec.ts
│   └── sms.service.ts
├── users
│   ├── dto
│   │   ├── create-users.dto.ts
│   │   ├── delete-users.dto.ts
│   │   ├── get-users.dto.ts
│   │   ├── get-usersbyid.dto.ts
│   │   └── update-users.dto.ts
│   ├── users.controller.spec.ts
│   ├── users.controller.ts
│   ├── users.entity.ts
│   ├── users.module.ts
│   ├── users.service.spec.ts
│   └── users.service.ts
└── views
    ├── chatting.ejs
    ├── community.ejs
    ├── components
    │   ├── footer.ejs
    │   ├── head.ejs
    │   ├── header.ejs
    │   ├── login-form.ejs
    │   ├── lost-id-form.ejs
    │   ├── lost-password-form.ejs
    │   ├── manager-camp-detail.ejs
    │   ├── manager-camp-registe.ejs
    │   ├── manager-camp-register.ejs
    │   ├── manager-camp-update.ejs
    │   ├── manager-camp.ejs
    │   ├── manager-coupon-detail.ejs
    │   ├── manager-coupon-register.ejs
    │   ├── manager-coupon-update.ejs
    │   ├── manager-coupon.ejs
    │   ├── manager-main.ejs
    │   ├── manager-menu.ejs
    │   ├── manager-orderlist.ejs
    │   ├── manager-users-update.ejs
    │   ├── manager-users.ejs
    │   ├── manager-usersInfo.ejs
    │   ├── mypage-coupon.ejs
    │   ├── register-form.ejs
    │   └── reset-password-form.ejs
    ├── controllers
    │   ├── auth.page.ts
    │   ├── main.page.ts
    │   ├── management.page.ts
    │   └── my.page.ts
    ├── func
    │   ├── page.request.ts
    │   └── page.ts
    ├── home.ejs
    ├── index.ejs
    ├── inquiry.ejs
    ├── login.ejs
    ├── lost-id.ejs
    ├── lost-password.ejs
    ├── management.ejs
    ├── mypage.ejs
    ├── reserve.ejs
    ├── reset-password.ejs
    ├── rooms.ejs
    └── sign-up.ejs

```
