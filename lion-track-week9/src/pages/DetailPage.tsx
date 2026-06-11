import { useMemo } from "react";
import type { User } from "@supabase/supabase-js";
import DetailCard from "../components/DetailCard";
import type { Lion } from "../types/lion";

interface DetailPageProps {
  lionId: string | null;
  lions: Lion[];
  isLoading: boolean;
  errorMessage: string;
  user: User | null;
  listUrl: string;
  onDelete: (lionId: string) => Promise<boolean>;
  onNavigate: (url: string) => void;
}

function DetailPage({
  lionId,
  lions,
  isLoading,
  errorMessage,
  user,
  listUrl,
  onDelete,
  onNavigate,
}: DetailPageProps) {
  const selectedLion = useMemo(() => lions.find((lion) => lion.id === lionId), [lions, lionId]);

  const handleDelete = async () => {
    if (!selectedLion || !user) return;

    const success = await onDelete(selectedLion.id);
    if (success) onNavigate(listUrl);
  };

  return (
    <main className="page">
      <header className="page-header split-header">
        <div>
          <button className="back-button" type="button" onClick={() => onNavigate(listUrl)}>
            목록으로 돌아가기
          </button>
          <h1>아기 사자 상세 프로필</h1>
          <p>선택한 아기 사자의 자기소개와 연락처를 확인할 수 있습니다.</p>
        </div>

        <div className="account-box">
          <span>{user?.email ?? "로그인하지 않음"}</span>
          <button type="button" onClick={() => onNavigate("/login")}>
            {user ? "계정 관리" : "로그인"}
          </button>
        </div>
      </header>

      <section className="detail-section">
        {isLoading && <p className="empty-text">데이터를 불러오는 중입니다.</p>}
        {errorMessage && <p className="error-text">{errorMessage}</p>}

        {!isLoading && selectedLion && (
          <>
            <DetailCard lion={selectedLion} />
            <div className="detail-actions">
              <button className="danger-button" type="button" disabled={!user} onClick={handleDelete}>
                삭제하기
              </button>
              {!user && <span className="message-text">삭제하려면 로그인이 필요합니다.</span>}
            </div>
          </>
        )}

        {!isLoading && !selectedLion && (
          <div className="not-found">
            <h2>해당 아기 사자를 찾을 수 없습니다.</h2>
            <p>목록 페이지에서 다시 선택해 주세요.</p>
            <button type="button" onClick={() => onNavigate(listUrl)}>
              목록 보기
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default DetailPage;
