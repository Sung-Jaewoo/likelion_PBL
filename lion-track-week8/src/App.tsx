import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./styles/style6.css";
import initialLions from "./data/lions";
import SummaryCardList from "./components/SummaryCardList";
import DetailCard from "./components/DetailCard";
import { useRandomLions } from "./hooks/useRandomLions";
import type { Lion, LionForm, LionId, PartFilter, RouteState, SortMode, ViewOptions } from "./types/lion";

const emptyForm: LionForm = {
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

const defaultViewOptions: ViewOptions = {
  filter: "all",
  sort: "latest",
  search: "",
};

function getRouteFromLocation(): RouteState {
  const match = window.location.pathname.match(/^\/lions\/([^/]+)$/);

  if (match) {
    return {
      page: "detail",
      lionId: decodeURIComponent(match[1]),
    };
  }

  return {
    page: "list",
    lionId: null,
  };
}

function getViewOptionsFromLocation(): ViewOptions {
  const params = new URLSearchParams(window.location.search);
  const filter = params.get("part") as PartFilter | null;
  const sort = params.get("sort") as SortMode | null;

  return {
    filter: filter ?? defaultViewOptions.filter,
    sort: sort ?? defaultViewOptions.sort,
    search: params.get("search") ?? defaultViewOptions.search,
  };
}

function buildListUrl({ filter, sort, search }: ViewOptions): string {
  const params = new URLSearchParams();

  if (filter !== defaultViewOptions.filter) {
    params.set("part", filter);
  }

  if (sort !== defaultViewOptions.sort) {
    params.set("sort", sort);
  }

  if (search.trim() !== defaultViewOptions.search) {
    params.set("search", search.trim());
  }

  const query = params.toString();
  return query ? `/?${query}` : "/";
}

function App() {
  const [lions, setLions] = useState<Lion[]>(initialLions);
  const [route, setRoute] = useState<RouteState>(getRouteFromLocation);
  const [viewOptions, setViewOptions] = useState<ViewOptions>(getViewOptionsFromLocation);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [form, setForm] = useState<LionForm>(emptyForm);
  const { isLoading, status, retryCount, setStatus, fetchRandomLions } = useRandomLions();
  const { filter, sort, search } = viewOptions;

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRouteFromLocation());
      setViewOptions(getViewOptionsFromLocation());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

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

  const selectedLion = useMemo(
    () => lions.find((lion) => String(lion.id) === route.lionId),
    [lions, route.lionId]
  );

  const isFormValid = Object.values(form).every((value) => value.trim() !== "");

  const handleAddRandom = async (count: number) => {
    const newUsers = await fetchRandomLions(count);
    setLions((prev) => [...prev, ...newUsers]);
  };

  const handleRefresh = async () => {
    const newUsers = await fetchRandomLions(lions.length);

    if (newUsers.length > 0) {
      setLions(newUsers);
    }
  };

  const handleDeleteLast = () => {
    setLions((prev) => prev.slice(0, -1));
    setStatus("마지막 항목 삭제 완료");
  };

  const updateViewOption = <K extends keyof ViewOptions>(key: K, value: ViewOptions[K]) => {
    const nextOptions = {
      ...viewOptions,
      [key]: value,
    };

    setViewOptions(nextOptions);
    window.history.pushState(null, "", buildListUrl(nextOptions));
    setRoute({ page: "list", lionId: null });
  };

  const moveToDetail = (lionId: LionId) => {
    window.history.pushState(null, "", `/lions/${encodeURIComponent(String(lionId))}`);
    setRoute({ page: "detail", lionId: String(lionId) });
  };

  const moveToList = () => {
    window.history.pushState(null, "", buildListUrl(viewOptions));
    setRoute({ page: "list", lionId: null });
  };

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid || form.part === "") return;

    const newLion: Lion = {
      ...form,
      part: form.part,
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
    const newUsers = await fetchRandomLions(1);

    if (newUsers.length === 0) return;

    const user = newUsers[0];

    setForm({
      name: user.name,
      part: user.part,
      grade: user.grade,
      tech: Array.isArray(user.tech) ? user.tech.join(", ") : user.tech,
      intro: user.intro,
      detailIntro: user.detailIntro,
      email: user.email,
      phone: user.phone,
      website: user.website,
      comment: user.comment,
    });

    setIsFormOpen(true);
  };

  if (route.page === "detail") {
    return (
      <main className="page">
        <header className="page-header">
          <button className="back-button" type="button" onClick={moveToList}>
            목록으로 돌아가기
          </button>
          <h1>아기 사자 상세 프로필</h1>
          <p>선택한 아기 사자의 자기소개와 연락처를 확인할 수 있습니다.</p>
        </header>

        <section className="detail-section">
          {selectedLion ? (
            <DetailCard lion={selectedLion} />
          ) : (
            <div className="not-found">
              <h2>해당 아기 사자를 찾을 수 없습니다.</h2>
              <p>목록 페이지에서 다시 선택해 주세요.</p>
              <button type="button" onClick={moveToList}>
                목록 보기
              </button>
            </div>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <header className="page-header">
        <h1>아기 사자 자기소개</h1>
        <p>요약 카드와 상세 자기소개를 한 화면에서 확인할 수 있습니다.</p>
      </header>

      <section className="control-panel">
        <div className="control-row">
          <button type="button" onClick={() => setIsFormOpen(true)}>아기 사자 추가</button>
          <button type="button" onClick={handleDeleteLast}>마지막 아기 사자 삭제</button>
          <span id="countText">총 {lions.length}명</span>
        </div>

        <div className="control-row">
          <button type="button" disabled={isLoading} onClick={() => handleAddRandom(1)}>
            랜덤 1명 추가
          </button>
          <button type="button" disabled={isLoading} onClick={() => handleAddRandom(5)}>
            랜덤 5명 추가
          </button>
          <button type="button" disabled={isLoading} onClick={handleRefresh}>
            전체 새로고침
          </button>
          <span id="statusText">{status}</span>

          {status === "불러오기 실패" && (
            <button type="button" disabled={isLoading} onClick={() => handleAddRandom(retryCount)}>
              다시 시도
            </button>
          )}
        </div>

        <div className="control-row filter-row">
          <label htmlFor="filterSelect">파트</label>
          <select
            id="filterSelect"
            value={filter}
            onChange={(event) => updateViewOption("filter", event.target.value as PartFilter)}
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
            onChange={(event) => updateViewOption("sort", event.target.value as SortMode)}
          >
            <option value="latest">최신 추가순</option>
            <option value="asc">이름 오름차순</option>
            <option value="desc">이름 내림차순</option>
          </select>

          <label htmlFor="searchInput">검색</label>
          <input
            id="searchInput"
            type="text"
            placeholder="이름으로 검색"
            value={search}
            onChange={(event) => updateViewOption("search", event.target.value)}
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
                <textarea id="detailIntro" value={form.detailIntro} onChange={handleFormChange} />
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
        <SummaryCardList lions={visibleLions} onSelect={moveToDetail} />
      </section>
    </main>
  );
}

export default App;
