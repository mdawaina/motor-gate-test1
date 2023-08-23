import { Sector } from "./sector";

export interface Company {
  id: number;
  refId: string;
  name: string;
  cityId: number;
  vatRegNumber: string;
  cr: string;
  address: string;
  mobileNumber: string;
  // region: string;
  disctrict: string;
  companyStatusId: number;
  //specializationId: number;
  //specialization: Specialization;
  companyStatus: CompanyStatus;
  city: City;
  createdOn: string;
  sectors: Sector[];
  specializations: Specialization[];
  services: Service[];
  isInWishList: boolean;
}

export interface CompanyForUpdate {
  id: number;
  refId: string;
  name: string;
  cityId: number;
  vatRegNumber: string;
  cr: string;
  address: string;
  disctrict: string;
  companyStatusId: number;
  //specializationId: number;
  //specialization: Specialization | null;
  companyStatus: CompanyStatus | null;
  city: City | null;
  createdOn: string;
  services: number[];
  sectors: number[];
  specializations: number[];
}

export interface CompanyStatus {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}

export interface Specialization {
  id: number;
  name: string;
}

export interface Service {
  id: number;
  name: string;
}

export interface CompanyParams {
  searchTerm?: string;
  pageNumber: number;
  pageSize: number;
  companyStatusId?: string;
  cityId?: number | null;
}

export interface FilterCompanyParams {
  searchTerm?: string;
  pageNumber: number;
  pageSize: number;
  companyStatusId?: number | null;
  cityId?: number | null;
  sectorId?: number | null;
  specializationId?: number | null;
  servicesString: string;
  serviceId?: number[] | null;
  companyId?: number | null;
}
