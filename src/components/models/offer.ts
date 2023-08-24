import { MetaData } from "./pagination";

export interface Offer {
  id: number;
  title: string;
  description: string;
  expireDate: string;
  createdOn: string;
}

export interface OfferParams extends MetaData {
  searchTerm: string;
}
