import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { FetchStatus, Lion, LionForm, RandomUserResponse } from "../types/lion";
import { mapLionFormToInsert, mapLionRowToLion, mapRandomUserToForm } from "../utils/lion";

export function useLions() {
  const [lions, setLions] = useState<Lion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<FetchStatus>("준비 완료");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchLions = useCallback(async () => {
    setIsLoading(true);
    setStatus("불러오는 중");
    setErrorMessage("");

    const { data, error } = await supabase
      .from("lions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMessage(error.message);
      setStatus("오류 발생");
      setIsLoading(false);
      return;
    }

    setLions((data ?? []).map(mapLionRowToLion));
    setStatus("준비 완료");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      fetchLions();
    });
  }, [fetchLions]);

  const createLion = async (form: LionForm, ownerId: string) => {
    setIsSaving(true);
    setStatus("저장 중");
    setErrorMessage("");

    const { data, error } = await supabase
      .from("lions")
      .insert(mapLionFormToInsert(form, ownerId))
      .select()
      .single();

    if (error) {
      setErrorMessage(error.message);
      setStatus("오류 발생");
      setIsSaving(false);
      return false;
    }

    setLions((prev) => [mapLionRowToLion(data), ...prev]);
    setStatus("추가 완료");
    setIsSaving(false);
    return true;
  };

  const createRandomLions = async (count: number, ownerId: string) => {
    setIsSaving(true);
    setStatus("불러오는 중");
    setErrorMessage("");

    try {
      const response = await fetch(`https://randomuser.me/api/?results=${count}`);
      if (!response.ok) throw new Error("랜덤 데이터를 불러오지 못했습니다.");

      const randomData = (await response.json()) as RandomUserResponse;
      const rows = randomData.results.map((user) =>
        mapLionFormToInsert(mapRandomUserToForm(user), ownerId)
      );
      const { data, error } = await supabase.from("lions").insert(rows).select();

      if (error) throw error;

      setLions((prev) => [...(data ?? []).map(mapLionRowToLion), ...prev]);
      setStatus("추가 완료");
      setIsSaving(false);
      return true;
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "랜덤 멤버 추가 중 오류가 발생했습니다."
      );
      setStatus("오류 발생");
      setIsSaving(false);
      return false;
    }
  };

  const deleteLion = async (lionId: string) => {
    setIsSaving(true);
    setStatus("저장 중");
    setErrorMessage("");

    const { error } = await supabase.from("lions").delete().eq("id", lionId);

    if (error) {
      setErrorMessage(error.message);
      setStatus("오류 발생");
      setIsSaving(false);
      return false;
    }

    setLions((prev) => prev.filter((lion) => lion.id !== lionId));
    setStatus("삭제 완료");
    setIsSaving(false);
    return true;
  };

  return {
    lions,
    isLoading,
    isSaving,
    status,
    errorMessage,
    fetchLions,
    createLion,
    createRandomLions,
    deleteLion,
  };
}
