export type ResDto = {
  content: [] | [];
  pageable: object;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: object;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export type Account = {
  id: string;
  username: string;
  phone: string;
  email: string;
  birth: string;
  market_agree: number;
  activated: boolean;
};
