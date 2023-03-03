# 설치모듈

```bash
npm i class-validator class-transformer
npm i typeorm @nestjs/typeorm mysql
npm i bcrypt
npm i @types/bcrypt -D
npm i @nestjs/config
npm i ts-node --save-dev
npm i dotenv
npm i joi
npm i @nestjs/swagger
npm i @nestjs/jwt
npm i ioredis @nestjs/microservices
npm i cache-manager
npm i @types/cache-manager
npm i cache-manager-ioredis
npm i @types/cache-manager-ioredis
npm i cookie-parser @types/cookie-parser
```

<br>

# 질문

- 아래의 이유로 joi를 사용해보려 하는데 더 좋은 방법이 있을까? 지금은 service 로직에서 비밀번호 체크중
  - 조이로 유효성체크를 해보자
  - 왜 joi로 유효성 체크를 하고싶은가?
  - 왜 저렇게 적어놨지? - Joi.ref를 사용하려고, class-validator에는 기능 미지원
- bcrypt hash함수를 사용할때, genSalt함수를 이용하여 salt 사용한 로직이 잘 안된다.
- 마이그레이션을 사용한다면 개인들이 작성한 엔티티들은 삭제를 해야 하나요?
- migration을 만들어 놓았지만, entity도 작성을 따로 해줘야 하는지?
  - 하는게 맞다고 생각중.. Entity를 각 모듈에서 typeOrmModule.forFeature에서 사용중

<input type="checkbox" checked > 데이터를 함수로 전달할때, 묶어서 전달하는게 좋을까, 풀어서 전달하는게 좋을까<br>
  - 묶인 데이터가 한가지를 설명할 수 있다면 묶어서 주고 아니라면 풀어주는게 좋다.

<input type="checkbox"  > swagger사용시 PickType 을 이용중이라면 어떻게 적어야할까? <br>
<input type="checkbox"  > migration - windows/mac path차이가 존재하는지  <br>
<input type="checkbox"  > aws  <br>
<input type="checkbox"  > nestjs에서의 테스트코드  <br>
<input type="checkbox"  > caching의 기준  <br>
<input type="checkbox"  > cache가 컨트롤러에 있는게 좋은지 서비스에있는게 좋은지 그리고 그 이유가 무엇인지?  <br>
<input type="checkbox"  > redis cluster가 뭔가?  <br>


<br>

# 구현해볼것에 대한 공부

- cache
  - 캐싱의 기준
    - 변동이 적은 데이터
    - 얼마나 자주 사용되는가
- RateLimiterRedis(Rate Limite 와 개념은 같다)
  - refresh token
  - 로그인 시도 횟수 제한(redis 기한을 길게 준다)


<br>

# 알게된 것
- 생일 타입을 스트링으로 하고, 로직에서 데이트로 변경하자. IsDateString을 사용해보자. - 해결
- migration 사용방법
- console.log()가 안나오길래 typeorm.config.service에서  logging: false를 주석처리 해주니 출력이 됐다.
- app.module에서 async로 import를 한다면, 사용하려는 모듈에서 똑같이 import를 해줘야 되더라...
- redis cache는 로직에서 ttl 지정이 안됐었는데, jwt는 지정이 가능하다. 지정을 하면 기본값 + 지정값이 된다

<br>

# 오늘의 진행상황
- redis로 refresh 토큰을 관리하려고 함
  - redis를 알기전에 cache부터 한번 사용해보려 함
    - swagger에서 authorization을 설정하는 방법을 알아야하지만 rest client로 일단 진행 - 테스트 통과
    - redis 설정을 하고 서버를 실행시켜보니 [ioredis] Unhandled error event: Error: connect ECONNREFUSED 127.0.0.1:6379
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1494:16) 이러한 에러가 뜬다.
    - 검색을 해보다 redis 설치가 안된것같다는 댓글을 보고 npm install 로는 설치가 안되나 생각이들어 소개해준 페이지로 들어가 설치를 진행해보았다.
      - https://github.com/tlaverdure/laravel-echo-server/issues/369
      - https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/
      - brew install redis
      - 뭔가 된것같지만 ttl이 안먹는다. -> 기본 캐시 ttl은 1/1000 초 이지만 redis ttl은 1/1초입니다.
- swagger authorization 설정방법