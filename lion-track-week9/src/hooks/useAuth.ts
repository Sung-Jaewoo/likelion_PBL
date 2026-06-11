import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      setUser(data.session?.user ?? null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({ email, password });

    setIsLoading(false);

    if (error) {
      setMessage(error.message);
      return false;
    }

    setMessage("회원가입이 완료되었습니다.");
    return true;
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setIsLoading(false);

    if (error) {
      setMessage(error.message);
      return false;
    }

    setMessage("로그인되었습니다.");
    return true;
  };

  const signOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setMessage("로그아웃되었습니다.");
    setIsLoading(false);
  };

  return {
    user,
    isLoading,
    message,
    signUp,
    signIn,
    signOut,
  };
}
