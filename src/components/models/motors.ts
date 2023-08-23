import { CompanyMotorYear } from "./companyMotorYearForCreate";

export interface Brand {
  id: number;
  name: string;
  nameEn: string;
  models: Model[];
}

export interface Model {
  id: number;
  name: string;
  nameEn: string;
  brandId: number;
  brand: Brand;
  motorYears: MotorYear[];
}

export interface MotorYear {
  id: number;
  name: string;
  nameEn: string;
  modelId: number;
  model: Model;
  companyMotorYears: CompanyMotorYear[];
}

export interface MotorParams {
  searchTerm?: string;
  pageNumber: number;
  pageSize: number;
  companyId?: number;
}

export interface CustomerMotor {
  id: number;
  chassisNo: string;
  plateNo: string;
  motorYearId: number;
  motorYear: MotorYear;
}

export interface AdminMotor {
  brandId: number;
  modelId: number;
  motorYearId: number;
}
