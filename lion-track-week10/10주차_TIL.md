# 📘 Today I Learned

### 1. 오늘 배운 내용
- React + Vite 프로젝트를 배포 가능한 형태로 정리하는 방법을 배웠다.
- Vercel에서 GitHub 저장소를 연결하고, 특정 하위 폴더(`lion-track-week10`)를 Root Directory로 지정해 배포하는 방법
- SPA 라우팅에서 새로고침 시 404가 나지 않도록 `vercel.json`의 rewrite 설정이 필요하다는 것을 배웠다.

### 2. 핵심 정리 (내 언어로)
- Vercel에 배포할 때 저장소 전체가 아니라 과제 폴더만 배포하려면 Root Directory를 정확히 설정해야 함!!
- React 앱은 브라우저에서 라우팅을 처리하기 때문에, Vercel 배포 시 모든 경로를 `index.html`로 보내는 설정이 필요!!
- 배포 후 빈 화면이 뜰 때는 환경 변수 누락, 배포 보호 설정, 빌드 설정 등을 확인해야 함!!
- SPA 라우팅에서 새로고침 시 404가 나지 않도록 `vercel.json`의 rewrite 설정이 필요!!

### 3. 결과 이미지(스크린샷)
<img width="1740" height="3772" alt="10주차_PBL 결과" src="https://github.com/user-attachments/assets/8eb31087-b7f4-448e-9072-2d6c28d3ccb7" />

### 4. 느낀 점
- 처음에는 로컬에서만 실행되면 끝이라고 생각했는데, 실제 배포까지 하려면 환경 변수, GitHub 연결, Vercel 설정까지 신경 써야 한다는 것을 깨닫게 되었다.
- Supabase와 Vercel을 함께 사용하면서 프론트엔드 프로젝트도 실제 서비스처럼 배포하고 관리할 수 있다는 점이 흥미로웠다.
- 다음에는 처음부터 배포 환경까지 고려해서 폴더 구조, 환경 변수, 라우팅 설정을 더 깔끔하게 준비해야겠다고 느꼈다.
