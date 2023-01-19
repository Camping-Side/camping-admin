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

const TAX_TYPE = {
  taxable: 0,     // 과세
  taxFree: 1,     // 면세
  smallScale: 2,  // 영세
} as const;

export type TaxType = typeof TAX_TYPE[keyof typeof TAX_TYPE];

const PRODUCT_TYPE = {
  normal: 0,      // 일반
} as const;

export type ProductType = typeof PRODUCT_TYPE[keyof typeof PRODUCT_TYPE];

const PRODUCT_STATUS = {
  register: 0,    // 등록
  sale: 1,        // 판매중
  end: 2,         // 판매중지
} as const;

export type ProductStatus = typeof PRODUCT_STATUS[keyof typeof PRODUCT_STATUS];

export type Product = {
  id: number,             // 고유 식별자
  name: string,           // 상품명
  taxTp: TaxType,         // 과세타입
  prdTp: ProductType,     // 상품타입
  prdSts: ProductStatus,  // 상품상태
  productDesc: string,    // 상품설명
  supplyPrc: number,      // 공급가
  salePrc: number,        // 판매가
  prdPrc: number,         // 소비자가
  totalCnt: number,       // 재고수량
  startDate: string,      // 판매시작일
  endDate: string,        // 판매종료일
};
