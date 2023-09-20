import { City } from "./company";

export interface BranchForCreate {
  name: string;
  nameEn: string;
  companyId: number;
  isMain: boolean;
  address: string;
  unitNo: string;
  phone: string;
  email: string;
  mobile: string;
  cityId: number | null;
  googleMapLink: string;
  lat: number | null;
  lon: number | null;
}

export interface Branch {
  id: number;
  refId: string;
  name: string;
  nameEn: string;
  companyId: number;
  isMain: boolean;
  address: string;
  unitNo: string;
  phone: string;
  email: string;
  mobile: string;
  cityId: number | null;
  city: City | null;
  googleMapLink: string;
  lat: number | null;
  lon: number | null;
  createdOn: string;
}
