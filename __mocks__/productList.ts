import { Chance } from "chance";
import { Product, ProductStatus, TaxType } from "../type/product/product";
const chance = new Chance();

const getDateString = (date: Date) =>
  `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;

const getProduct = (): Product => {
  const startDate = chance.date();
  const endDate = chance.date({ min: startDate }) as Date;

  return {
    id: chance.integer({ min: 0 }),
    name: chance.word(),
    taxTp: chance.integer({ min: 0, max: 2 }) as TaxType,
    prdTp: 0,
    prdSts: chance.integer({ min: 0, max: 2 }) as ProductStatus,
    productDesc: chance.sentence(),
    supplyPrc: chance.integer({ min: 0 }),
    salePrc: chance.integer({ min: 0 }),
    prdPrc: chance.integer({ min: 0 }),
    totalCnt: chance.integer(),
    startDate: getDateString(startDate),
    endDate: getDateString(endDate),
  };
};

export const getProductList = (length: number): Product[] =>
  Array.from({ length }).map(() => getProduct());
