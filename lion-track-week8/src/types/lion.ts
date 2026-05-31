export type Part = "Frontend" | "Backend" | "Design";
export type PartFilter = Part | "all";
export type SortMode = "latest" | "asc" | "desc";
export type LionId = string | number;
export type PageName = "list" | "detail";
export type FetchStatus = "준비 완료" | "불러오는 중..." | "불러오기 성공" | "불러오기 실패" | "마지막 항목 삭제 완료" | "직접 입력 데이터 추가 완료";

export interface Lion {
  id: LionId;
  name: string;
  part: Part;
  grade: string;
  tech: string | string[];
  intro: string;
  detailIntro: string;
  email: string;
  phone: string;
  website: string;
  comment: string;
  image: string;
  badge?: string;
  isMe?: boolean;
}

export interface LionForm {
  name: string;
  part: Part | "";
  grade: string;
  tech: string;
  intro: string;
  detailIntro: string;
  email: string;
  phone: string;
  website: string;
  comment: string;
}

export interface ViewOptions {
  filter: PartFilter;
  sort: SortMode;
  search: string;
}

export interface RouteState {
  page: PageName;
  lionId: string | null;
}

export interface RandomUser {
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  picture: {
    large: string;
  };
}

export interface RandomUserResponse {
  results: RandomUser[];
}
