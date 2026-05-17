import "./styles/style5.css";
import lions from "./data/lions";
import SummaryCardList from "./components/SummaryCardList";
import DetailCardList from "./components/DetailCardList";

function App() {
  return (
    <main className="page">
      <header className="page-header">
        <h1>아기 사자 자기소개</h1>
        <p>요약 카드와 상세 자기소개를 한 화면에서 확인할 수 있습니다.</p>
      </header>

      <section className="control-panel">
        <div className="control-row">
          <button>아기 사자 추가</button>
          <button>마지막 아기 사자 삭제</button>
          <span>총 {lions.length}명</span>
        </div>

        <div className="control-row">
          <button>랜덤 1명 추가</button>
          <button>랜덤 5명 추가</button>
          <button>전체 새로고침</button>
          <span>준비 완료</span>
        </div>

        <div className="control-row filter-row">
          <label htmlFor="filterSelect">파트</label>
          <select id="filterSelect">
            <option value="all">전체</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">Design</option>
          </select>

          <label htmlFor="sortSelect">정렬</label>
          <select id="sortSelect">
            <option value="latest">최신추가순</option>
            <option value="asc">이름 오름차순</option>
            <option value="desc">이름 내림차순</option>
          </select>

          <label htmlFor="searchInput">검색</label>
          <input id="searchInput" type="text" placeholder="이름으로 검색" />
        </div>
      </section>

      <section className="form-section">
        <h2>아기 사자 정보 입력</h2>

        <div className="form-grid">
          <div>
            <label htmlFor="name">이름</label>
            <input id="name" type="text" placeholder="예: 홍아기사자" />
          </div>

          <div>
            <label htmlFor="part">파트</label>
            <select id="part">
              <option value="">파트를 선택하세요</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Design">Design</option>
            </select>
          </div>

          <div className="wide">
            <label htmlFor="tech">관심 기술 (쉼표로 구분)</label>
            <input
              id="tech"
              type="text"
              placeholder="예: JavaScript, React, HTML/CSS"
            />
          </div>

          <div className="wide">
            <label htmlFor="intro">한 줄 소개 (요약 카드)</label>
            <input
              id="intro"
              type="text"
              placeholder="예: 3주차 DOM 조작 연습 중!"
            />
          </div>

          <div className="wide">
            <label htmlFor="detailIntro">자기소개 (상세 카드)</label>
            <textarea
              id="detailIntro"
              placeholder="예: HTML/CSS로 구조를 만들고, JS로 데이터를 바꾸면 화면이 바뀌는 경험을 하고 있습니다."
            ></textarea>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="예: lion@example.com" />
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <input id="phone" type="text" placeholder="예: 010-1234-5678" />
          </div>

          <div className="wide">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="url"
              placeholder="예: https://example.com"
            />
          </div>

          <div className="wide">
            <label htmlFor="comment">한 마디</label>
            <input
              id="comment"
              type="text"
              placeholder="예: 데이터 바꾸면 화면도 바뀐다!"
            />
          </div>
        </div>

        <div className="form-buttons">
          <button>추가하기</button>
          <button>취소</button>
        </div>
      </section>

      <h2 className="section-title">아기 사자 카드 목록 영역</h2>

      <section className="summary-section">
        <SummaryCardList lions={lions} />
      </section>

      <section className="detail-section">
        <h2>상세 자기소개</h2>
        <DetailCardList lions={lions} />
      </section>
    </main>
  );
}

export default App;