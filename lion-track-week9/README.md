# lion-track-week9

Supabase 데이터베이스와 이메일/비밀번호 인증을 연동한 아기 사자 명단 앱입니다.

## 실행 방법

```bash
yarn install
yarn dev
```

개발 서버는 기본적으로 `http://localhost:5173`에서 실행됩니다.

## Supabase 설정

1. Supabase 프로젝트를 생성합니다.
2. SQL Editor에서 `supabase-schema.sql` 내용을 실행합니다.
3. Authentication > Sign In / Providers에서 Email provider를 켭니다.
4. 개발 중 이메일 발송 제한이 발생하면 Confirm email 옵션을 끕니다.
5. `.env.local`에 프로젝트 URL과 anon key를 입력합니다.

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

`.env.local`은 `.gitignore`의 `*.local` 규칙으로 Git에 포함되지 않습니다.
