# lion-track-week10

Supabase 인증과 데이터베이스를 연동한 아기 사자 자기소개 카드 앱입니다.

## 실행 방법

```bash
yarn install
yarn dev
```

개발 서버는 기본적으로 `http://localhost:5173`에서 실행됩니다.

## 프로덕션 빌드 확인

```bash
yarn build
yarn preview
```

## 환경 변수

로컬에서는 `.env.local`에 아래 값을 설정합니다.

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Vercel 배포 시 Project Settings > Environment Variables에 같은 이름으로 등록해야 합니다.
환경 변수는 코드나 Git 저장소에 직접 포함하지 않습니다.

## Supabase 준비

1. Supabase 프로젝트를 생성합니다.
2. SQL Editor에서 `supabase-schema.sql` 내용을 실행합니다.
3. Authentication > Sign In / Providers에서 Email provider를 켭니다.
4. 필요하다면 개발 중 Confirm email 옵션을 조정합니다.
5. `.env.local`과 Vercel 환경 변수에 URL, anon key를 입력합니다.

## 주요 기능

- 로그인, 회원가입, 로그아웃
- 아기 사자 목록 조회, 추가, 삭제
- Random User API를 활용한 랜덤 멤버 추가
- 파트 필터, 이름 검색, 이름 정렬
- 목록, 상세, 로그인 페이지 라우팅
- 로딩, 에러, 빈 상태 안내
