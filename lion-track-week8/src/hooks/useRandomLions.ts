import { useCallback, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { FetchStatus, Lion, RandomUserResponse } from "../types/lion";
import { buildLionFromRandomUser } from "../utils/lion";

interface UseRandomLionsResult {
  isLoading: boolean;
  status: FetchStatus;
  retryCount: number;
  setStatus: Dispatch<SetStateAction<FetchStatus>>;
  fetchRandomLions: (count: number) => Promise<Lion[]>;
}

export function useRandomLions(): UseRandomLionsResult {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<FetchStatus>("준비 완료");
  const [retryCount, setRetryCount] = useState<number>(1);

  const fetchRandomLions = useCallback(async (count: number): Promise<Lion[]> => {
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

      const json = (await response.json()) as RandomUserResponse;
      setStatus("불러오기 성공");
      return json.results.map(buildLionFromRandomUser);
    } catch {
      setStatus("불러오기 실패");
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, status, retryCount, setStatus, fetchRandomLions };
}
