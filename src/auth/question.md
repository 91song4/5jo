# 설치모듈

```bash
npm i class-validator class-transformer
npm i typeorm @nestjs/typeorm mysql
npm i bcrypt
npm i @types/bcrypt -D
npm i @nestjs/config
npm i ts-node --save-dev
npm i dotenv
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
<input type="checkbox"  > <br>
<input type="checkbox"  > <br>
<input type="checkbox"  > <br>
<br>

# 구현해볼것에 대한 공부

- RateLimiterRedis(Rate Limite 와 개념은 같다)
  - refresh token
  - 로그인 시도 횟수 제한(redis 기한을 길게 준다)

- bcrypt.hash, genSalt()

<br>

# 알게된 것
생일 타입을 스트링으로 하고, 로직에서 데이트로 변경하자. IsDateString을 사용해보자. - 해결
migration 사용방법