export type Part = "Frontend" | "Backend" | "Design";
export type PartFilter = Part | "all";
export type SortMode = "latest" | "asc" | "desc";
export type LionId = string;
export type PageName = "list" | "detail" | "login";
export type FetchStatus =
  | "준비 완료"
  | "불러오는 중"
  | "저장 중"
  | "추가 완료"
  | "삭제 완료"
  | "오류 발생";

export interface Lion {
  id: LionId;
  name: string;
  part: Part;
  grade: string;
  tech: string[];
  intro: string;
  detailIntro: string;
  email: string;
  phone: string;
  website: string;
  comment: string;
  image: string;
  badge?: string;
  ownerId?: string | null;
  createdAt: string;
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
  image: string;
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
  nat: string;
  location: {
    country: string;
    city: string;
  };
  picture: {
    large: string;
  };
}

export interface RandomUserResponse {
  results: RandomUser[];
}
