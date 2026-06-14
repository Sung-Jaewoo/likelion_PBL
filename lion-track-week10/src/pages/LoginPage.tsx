import type { User } from "@supabase/supabase-js";
import AuthForm from "../components/AuthForm";

interface LoginPageProps {
  user: User | null;
  authLoading: boolean;
  authMessage: string;
  onLogin: (email: string, password: string) => Promise<boolean>;
  onSignup: (email: string, password: string) => Promise<boolean>;
  onLogout: () => Promise<void>;
  onNavigate: (url: string) => void;
}

function LoginPage({
  user,
  authLoading,
  authMessage,
  onLogin,
  onSignup,
  onLogout,
  onNavigate,
}: LoginPageProps) {
  const handleLogout = async () => {
    await onLogout();
    onNavigate("/");
  };

  return (
    <main className="auth-shell">
      <div className="brand-title">
        <h1>Lion Track</h1>
        <p>아기 사자 명단을 관리하려면 로그인해 주세요.</p>
      </div>

      {user ? (
        <section className="auth-card">
          <h2>로그인 상태</h2>
          <p className="signed-email">{user.email}</p>
          <button className="auth-submit" type="button" onClick={() => onNavigate("/")}>
            명단 보기
          </button>
          <button className="text-button" type="button" disabled={authLoading} onClick={handleLogout}>
            로그아웃
          </button>
        </section>
      ) : (
        <AuthForm
          isLoading={authLoading}
          message={authMessage}
          onLogin={onLogin}
          onSignup={onSignup}
          onSuccess={() => onNavigate("/")}
        />
      )}
    </main>
  );
}

export default LoginPage;
