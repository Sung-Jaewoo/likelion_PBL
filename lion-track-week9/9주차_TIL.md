# 📘 Today I Learned

### 1. 오늘 배운 내용
- Supabase 프로젝트를 만들고 프론트엔드와 연결하는 방법을 배웠다.
- Supabase SQL Editor에서 SQL 파일을 실행해 테이블을 생성하는 방법을 배웠다.
- `.env.local`에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`를 설정하는 방법을 배웠다.
- 로그인/회원가입 기능을 Supabase Auth로 구현하는 흐름을 배웠다.
- 로그인 여부에 따라 버튼을 활성화/비활성화하는 방법을 배웠다.



### 2. 핵심 정리 (내 언어로)
- Supabase를 사용할 때는 먼저 데이터베이스 테이블을 만들어야 하고, 프론트엔드에서는 Supabase URL과 Key를 이용해서 연결한다!!!
- `VITE_SUPABASE_URL`에는 `/rest/v1`까지 넣는 것이 아니라 `https://프로젝트ID.supabase.co` 형태까지만 넣어야 힘
- `.env.local`은 개인 키가 들어가는 파일이기 때문에 Git에 올라가지 않도록 `.gitignore`로 제외해야 힘
### 3. 결과 이미지(스크린샷)
-<img width="1770" height="1530" alt="9주차_PBL 결과" src="https://github.com/user-attachments/assets/3a7d349d-def2-47e9-abbf-6dca02c09626" />


### 4. 느낀 점
- Supabase를 처음 연결할 때는 URL이나 Key 설정을 정확히 해야 해서 조금 헷갈렸지만, 환경 변수를 어떻게 사용하는지 이해할 수 있었다.
- 단순히 화면만 만드는 것이 아니라 실제 데이터베이스에 저장하고 불러오는 과정을 구현해보니 프론트엔드와 백엔드가 연결되는 흐름을 더 잘 알게 되었다.
- 로그인 여부에 따라 기능을 제한하는 방식이 실제 서비스에서 많이 사용될 것 같다고 느꼈다.
