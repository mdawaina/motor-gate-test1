import { Company } from "./company";

export interface WishList {
  id: number;
  companyId: number;
  customerId: number;
  company: Company;
}

export interface WishListParams {
  searchTerm?: string;
  pageNumber: number;
  pageSize: number;
}
