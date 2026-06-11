import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import SummaryCardList from "../components/SummaryCardList";
import type { FetchStatus, Lion, LionForm, PartFilter, SortMode, ViewOptions } from "../types/lion";

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
  image: "",
};

interface HomePageProps {
  lions: Lion[];
  isLoading: boolean;
  isSaving: boolean;
  errorMessage: string;
  status: FetchStatus;
  user: User | null;
  viewOptions: ViewOptions;
  onCreate: (form: LionForm, ownerId: string) => Promise<boolean>;
  onDelete: (lionId: string) => Promise<boolean>;
  onRefresh: () => Promise<void>;
  onNavigate: (url: string) => void;
  onUpdateViewOption: <K extends keyof ViewOptions>(key: K, value: ViewOptions[K]) => void;
}

function HomePage({
  lions,
  isLoading,
  isSaving,
  errorMessage,
  status,
  user,
  viewOptions,
  onCreate,
  onDelete,
  onRefresh,
  onNavigate,
  onUpdateViewOption,
}: HomePageProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState<LionForm>(emptyForm);
  const { filter, sort, search } = viewOptions;

  const visibleLions = useMemo(() => {
    let data = [...lions];

    if (filter !== "all") data = data.filter((lion) => lion.part === filter);

    if (search.trim() !== "") {
      const keyword = search.trim().toLowerCase();
      data = data.filter((lion) => lion.name.toLowerCase().includes(keyword));
    }

    if (sort === "asc") data.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "desc") data.sort((a, b) => b.name.localeCompare(a.name));

    return data;
  }, [lions, filter, search, sort]);

  const isFormValid =
    form.name.trim() !== "" &&
    form.part !== "" &&
    form.grade.trim() !== "" &&
    form.tech.trim() !== "" &&
    form.intro.trim() !== "" &&
    form.detailIntro.trim() !== "" &&
    form.email.includes("@");

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user || !isFormValid) return;

    const success = await onCreate(form, user.id);
    if (!success) return;

    setForm(emptyForm);
    setIsFormOpen(false);
  };

  const handleDeleteLast = async () => {
    if (!user || lions.length === 0) return;
    await onDelete(lions[0].id);
  };

  return (
    <main className="page">
      <header className="page-header split-header">
        <div>
          <h1>아기 사자 자기소개</h1>
          <p>Supabase 데이터베이스에 저장된 아기 사자 명단을 조회하고 관리합니다.</p>
        </div>

        <div className="account-box">
          <span>{user?.email ?? "로그인하지 않음"}</span>
          <button type="button" onClick={() => onNavigate("/login")}>
            {user ? "계정 관리" : "로그인"}
          </button>
        </div>
      </header>

      <section className="control-panel">
        <div className="control-row">
          <button type="button" disabled={!user || isSaving} onClick={() => setIsFormOpen(true)}>
            아기 사자 추가
          </button>
          <button type="button" disabled={!user || isSaving || lions.length === 0} onClick={handleDeleteLast}>
            최근 아기 사자 삭제
          </button>
          <button type="button" disabled={isLoading} onClick={onRefresh}>
            새로고침
          </button>
          <span id="countText">총 {lions.length}명</span>
        </div>

        <div className="control-row">
          <span id="statusText">{status}</span>
          {!user && <span className="message-text">추가/삭제는 로그인 후 사용할 수 있습니다.</span>}
          {errorMessage && <span className="error-text">{errorMessage}</span>}
        </div>

        <div className="control-row filter-row">
          <label htmlFor="filterSelect">파트</label>
          <select
            id="filterSelect"
            value={filter}
            onChange={(event) => onUpdateViewOption("filter", event.target.value as PartFilter)}
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
            onChange={(event) => onUpdateViewOption("sort", event.target.value as SortMode)}
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
            onChange={(event) => onUpdateViewOption("search", event.target.value)}
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

              <div>
                <label htmlFor="tech">관심 기술</label>
                <input id="tech" value={form.tech} onChange={handleFormChange} placeholder="React, TypeScript" />
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
                <input id="email" type="email" value={form.email} onChange={handleFormChange} />
              </div>

              <div>
                <label htmlFor="phone">Phone</label>
                <input id="phone" value={form.phone} onChange={handleFormChange} />
              </div>

              <div className="wide">
                <label htmlFor="website">Website</label>
                <input id="website" value={form.website} onChange={handleFormChange} placeholder="https://example.com" />
              </div>

              <div className="wide">
                <label htmlFor="image">Image URL</label>
                <input id="image" value={form.image} onChange={handleFormChange} placeholder="비워두면 기본 이미지 사용" />
              </div>

              <div className="wide">
                <label htmlFor="comment">한 마디</label>
                <input id="comment" value={form.comment} onChange={handleFormChange} />
              </div>
            </div>

            <div className="form-buttons">
              <button className="primary-button" type="submit" id="submitBtn" disabled={!isFormValid || isSaving}>
                추가하기
              </button>
              <button type="button" id="cancelBtn" onClick={() => setIsFormOpen(false)}>
                취소
              </button>
            </div>
          </form>
        </section>
      )}

      <h2 className="section-title">아기 사자 카드 목록 영역</h2>

      <section className="summary-section">
        {isLoading ? (
          <p className="empty-text">데이터를 불러오는 중입니다.</p>
        ) : (
          <SummaryCardList lions={visibleLions} onSelect={(lionId) => onNavigate(`/lions/${lionId}`)} />
        )}
      </section>
    </main>
  );
}

export default HomePage;
