# 📘 Today I Learned

### 1. 오늘 배운 내용
- 기존 JavaScript DOM 조작 방식으로 만들었던 명단 페이지를 React 방식으로 바꾸는 방법을 배웠다.
- `useState`를 사용해서 아기 사자 명단, 필터, 정렬, 검색어, 폼 입력값, 로딩 상태를 관리했다.
- `props`를 사용해서 `SummaryCardList`, `SummaryCard`, `DetailCardList`, `DetailCard` 컴포넌트에 데이터를 전달했다.
- `fetch`를 사용해서 외부 API 데이터를 불러오고, 화면에 새 카드로 추가하는 기능을 구현했다.

### 2. 핵심 정리 (내 언어로)
- React에서는 `document.getElementById`나 `innerHTML`로 화면을 직접 바꾸기보다, 상태 값을 바꾸면 화면이 자동으로 다시 그려짐.
- 명단 데이터는 `lions` 상태로 관리, 필터/정렬/검색 조건에 맞는 데이터만 `visibleLions`로 계산해서 화면에 표출!
- 컴포넌트를 나누면 카드 목록과 상세 정보를 더 깔끔하게 관리할 수 있고, 같은 데이터를 여러 위치에서 일관됨을 보여줄 수 있음.

### 3. 결과 이미지(스크린샷)
-<img width="1740" height="16384" alt="6주차_PBL 결과" src="https://github.com/user-attachments/assets/c7691ced-be70-40e2-a0b3-3a5a7c019109" />

### 4. 느낀 점
- 처음에는 DOM 조작 방식과 React 방식의 차이가 헷갈렸지만, 상태가 바뀌면 화면이 자동으로 바뀐다는 흐름을 이해할 수 있었다.
- 컴포넌트를 나누고 props로 데이터를 전달하는 방식이 아직 익숙하지는 않지만, 코드 구조가 더 깔끔해지는 것을 느꼈다.
