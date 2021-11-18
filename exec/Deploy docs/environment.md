## Environment Variable

- backend/settings.ini 에 다음과 같이 작성

  ```
  [settings]
  SECRET_KEY=django-insecure-4pku8*#cl&n4&k&-ps@4th^(#d5#5*^mswyz0iuu$jsgj0_&*j
  POSTGRES_NAME=final_pjt
  POSTGRES_USER=admin
  POSTGRES_PASSWORD=qwe123!@#
  POSTGRES_HOST=host.docker.internal
  POSTGRES_PORT=
  KAKAO_ADMIN=8051c1870d17a9e790ea10d9dbaef386
  KAKAO_RESTAPI=53fa9c906295d87664177f20206df757
  KAKAO_CLIENT_SECRET=dJOtjhIPHoTUqSFIxz7YT9ZNWMnDTIFa
  GOOGLE_CLIENT_ID=264131910292-idqn4331rftchrk17de6hctvf9bob1o7.apps.googleusercontent.com
  GOOGLE_SECRET_KEY=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
  ```

  ```
  설명
  SECRET_KEY=	JWT 시크릿 시리얼
  POSTGRES_NAME=	DB 이름
  POSTGRES_USER=	DB 계정 아이디
  POSTGRES_PASSWORD=	DB 계정 비밀번호
  POSTGRES_HOST=	DB 호스트
  POSTGRES_PORT=	DB 포트
  KAKAO_ADMIN=	카카오 로그인, 결제 관련
  KAKAO_RESTAPI=	카카오 로그인, 결제 관련
  KAKAO_CLIENT_SECRET=	카카오 로그인, 결제 관련
  GOOGLE_CLIENT_ID=	구글 로그인 관련
  GOOGLE_SECRET_KEY=	구글 로그인 관련
  ```

  