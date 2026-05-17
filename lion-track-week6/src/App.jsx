import { useMemo, useState } from "react";
import "./styles/style6.css";
import initialLions from "./data/lions";
import SummaryCardList from "./components/SummaryCardList";
import DetailCardList from "./components/DetailCardList";

const emptyForm = {
  name: "",
  part: "",
  grade: "",
  tech: "",
  intro: "",
  detailIntro: "",
  email: "",
  phone: "",
  website: "",
  comment: "",
};

function App() {
  const [lions, setLions] = useState(initialLions);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("latest");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("준비 완료");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [retryCount, setRetryCount] = useState(1);

  const visibleLions = useMemo(() => {
    let data = [...lions];

    if (filter !== "all") {
      data = data.filter((lion) => lion.part === filter);
    }

    if (search.trim() !== "") {
      data = data.filter((lion) => lion.name.includes(search.trim()));
    }

    if (sort === "asc") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "desc") {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }

    return data;
  }, [lions, filter, sort, search]);

  const isFormValid = Object.values(form).every(
    (value) => value.trim() !== ""
  );

  const fetchUsers = async (count) => {
    setIsLoading(true);
    setStatus("불러오는 중...");
    setRetryCount(count);

    try {
      const response = await fetch(
        `https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au,nz`
      );

      if (!response.ok) {
        throw new Error("API 요청 실패");
      }

      const json = await response.json();
      const parts = ["Frontend", "Backend", "Design"];
      const techs = ["JavaScript", "React", "HTML / CSS", "Node.js", "Figma"];

      const newUsers = json.results.map((user) => {
        const part = parts[Math.floor(Math.random() * parts.length)];
        const tech = techs[Math.floor(Math.random() * techs.length)];

        return {
          id: user.login.uuid,
          name: `${user.name.first}기사자`,
          part,
          grade: String(Math.floor(Math.random() * 4) + 1),
          tech,
          intro: "외부 API에서 불러온 아기 사자입니다.",
          detailIntro:
            "fetch를 사용해 외부 데이터를 불러오고 React state로 화면을 갱신했습니다.",
          email: user.email,
          phone: user.phone,
          website: "https://example.com",
          comment: "랜덤 데이터로 추가되었습니다.",
          image: user.picture.large,
        };
      });

      setStatus("불러오기 성공");
      return newUsers;
    } catch (error) {
      setStatus("불러오기 실패");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRandom = async (count) => {
    const newUsers = await fetchUsers(count);
    setLions((prev) => [...prev, ...newUsers]);
  };

  const handleRefresh = async () => {
    const count = lions.length;
    const newUsers = await fetchUsers(count);

    if (newUsers.length > 0) {
      setLions(newUsers);
    }
  };

  const handleDeleteLast = () => {
    setLions((prev) => prev.slice(0, -1));
    setStatus("마지막 항목 삭제 완료");
  };

  const handleFormChange = (event) => {
    const { id, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    const newLion = {
      ...form,
      id: crypto.randomUUID(),
      image: "https://placehold.co/600x400?text=Lion",
    };

    setLions((prev) => [...prev, newLion]);
    setForm(emptyForm);
    setIsFormOpen(false);
    setStatus("직접 입력 데이터 추가 완료");
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setIsFormOpen(false);
  };

  const handleFillRandomForm = async () => {
    const newUsers = await fetchUsers(1);

    if (newUsers.length === 0) return;

    const user = newUsers[0];

    setForm({
      name: user.name,
      part: user.part,
      grade: user.grade,
      tech: user.tech,
      intro: user.intro,
      detailIntro: user.detailIntro,
      email: user.email,
      phone: user.phone,
      website: user.website,
      comment: user.comment,
    });

    setIsFormOpen(true);
  };

  return (
    <main className="page">
      <header className="page-header">
        <h1>아기 사자 자기소개</h1>
        <p>요약 카드와 상세 자기소개를 한 화면에서 확인할 수 있습니다.</p>
      </header>

      <section className="control-panel">
        <div className="control-row">
          <button onClick={() => setIsFormOpen(true)}>아기 사자 추가</button>
          <button onClick={handleDeleteLast}>마지막 아기 사자 삭제</button>
          <span id="countText">총 {lions.length}명</span>
        </div>

        <div className="control-row">
          <button disabled={isLoading} onClick={() => handleAddRandom(1)}>
            랜덤 1명 추가
          </button>
          <button disabled={isLoading} onClick={() => handleAddRandom(5)}>
            랜덤 5명 추가
          </button>
          <button disabled={isLoading} onClick={handleRefresh}>
            전체 새로고침
          </button>
          <span id="statusText">{status}</span>

          {status === "불러오기 실패" && (
            <button disabled={isLoading} onClick={() => handleAddRandom(retryCount)}>
              재시도
            </button>
          )}
        </div>

        <div className="control-row filter-row">
          <label htmlFor="filterSelect">파트</label>
          <select
            id="filterSelect"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="all">전체</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">Design</option>
          </select>

          <label htmlFor="sortSelect">정렬</label>
          <select
            id="sortSelect"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="latest">최신추가순</option>
            <option value="asc">이름 오름차순</option>
            <option value="desc">이름 내림차순</option>
          </select>

          <label htmlFor="searchInput">검색</label>
          <input
            id="searchInput"
            type="text"
            placeholder="이름으로 검색"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </section>

      {isFormOpen && (
        <section className="form-section">
          <h2>아기 사자 정보 입력</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div>
                <label htmlFor="name">이름</label>
                <input id="name" value={form.name} onChange={handleFormChange} />
              </div>

              <div>
                <label htmlFor="part">파트</label>
                <select id="part" value={form.part} onChange={handleFormChange}>
                  <option value="">파트를 선택하세요</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Design">Design</option>
                </select>
              </div>

              <div>
                <label htmlFor="grade">학년</label>
                <input id="grade" value={form.grade} onChange={handleFormChange} />
              </div>

              <div className="wide">
                <label htmlFor="tech">관심 기술</label>
                <input id="tech" value={form.tech} onChange={handleFormChange} />
              </div>

              <div className="wide">
                <label htmlFor="intro">한 줄 소개</label>
                <input id="intro" value={form.intro} onChange={handleFormChange} />
              </div>

              <div className="wide">
                <label htmlFor="detailIntro">자기소개</label>
                <textarea
                  id="detailIntro"
                  value={form.detailIntro}
                  onChange={handleFormChange}
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input id="email" value={form.email} onChange={handleFormChange} />
              </div>

              <div>
                <label htmlFor="phone">Phone</label>
                <input id="phone" value={form.phone} onChange={handleFormChange} />
              </div>

              <div className="wide">
                <label htmlFor="website">Website</label>
                <input id="website" value={form.website} onChange={handleFormChange} />
              </div>

              <div className="wide">
                <label htmlFor="comment">한 마디</label>
                <input id="comment" value={form.comment} onChange={handleFormChange} />
              </div>
            </div>

            <div className="form-buttons">
              <button type="button" onClick={handleFillRandomForm}>
                랜덤 값 채우기
              </button>
              <button type="submit" id="submitBtn" disabled={!isFormValid}>
                추가하기
              </button>
              <button type="button" id="cancelBtn" onClick={handleCancel}>
                취소
              </button>
            </div>
          </form>
        </section>
      )}

      <h2 className="section-title">아기 사자 카드 목록 영역</h2>

      <section className="summary-section">
        <SummaryCardList lions={visibleLions} />
      </section>

      <section className="detail-section">
        <h2>상세 자기소개</h2>
        <DetailCardList lions={visibleLions} />
      </section>
    </main>
  );
}

export default App;