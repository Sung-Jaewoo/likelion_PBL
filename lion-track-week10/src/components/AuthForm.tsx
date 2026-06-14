import { useState } from "react";
import type { FormEvent } from "react";

interface AuthFormProps {
  isLoading: boolean;
  message: string;
  onLogin: (email: string, password: string) => Promise<boolean>;
  onSignup: (email: string, password: string) => Promise<boolean>;
  onSuccess: () => void;
}

function AuthForm({ isLoading, message, onLogin, onSignup, onSuccess }: AuthFormProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [localMessage, setLocalMessage] = useState("");

  const isSignup = mode === "signup";
  const isPasswordValid = password.length >= 6;
  const isPasswordMatched = !isSignup || password === passwordConfirm;
  const isFormValid = email.includes("@") && isPasswordValid && isPasswordMatched;
  const visibleMessage = localMessage || message;
  const isPositiveMessage =
    visibleMessage.includes("완료") ||
    visibleMessage.includes("로그인되었습니다") ||
    visibleMessage.includes("확인");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalMessage("");

    if (!email.includes("@")) {
      setLocalMessage("이메일 형식을 확인해 주세요.");
      return;
    }

    if (!isPasswordValid) {
      setLocalMessage("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    if (isSignup && !isPasswordMatched) {
      setLocalMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    const success = isSignup ? await onSignup(email, password) : await onLogin(email, password);

    if (success && !isSignup) {
      onSuccess();
    }
  };

  const switchMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setLocalMessage("");
    setPassword("");
    setPasswordConfirm("");
  };

  return (
    <section className="auth-card">
      <h2>{isSignup ? "회원가입" : "로그인"}</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="authEmail">이메일</label>
        <input
          id="authEmail"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="example@email.com"
        />

        <label htmlFor="authPassword">비밀번호</label>
        <input
          id="authPassword"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="6자 이상"
        />

        {isSignup && (
          <>
            <label htmlFor="authPasswordConfirm">비밀번호 확인</label>
            <input
              id="authPasswordConfirm"
              type="password"
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
              placeholder="비밀번호 재입력"
            />
          </>
        )}

        {visibleMessage && (
          <p className={isPositiveMessage ? "message-text" : "form-error"}>{visibleMessage}</p>
        )}

        <button className="auth-submit" type="submit" disabled={!isFormValid || isLoading}>
          {isLoading ? "처리 중" : isSignup ? "회원가입" : "로그인"}
        </button>
      </form>

      <p className="auth-switch">
        {isSignup ? "이미 계정이 있나요?" : "계정이 없나요?"}
        <button type="button" onClick={switchMode}>
          {isSignup ? "로그인" : "회원가입"}
        </button>
      </p>
    </section>
  );
}

export default AuthForm;
