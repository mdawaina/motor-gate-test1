import { Model, MotorYear } from "./motors";

export interface CompanyMotorYearForCreate {
  companyId: number;
  motorYearId: number;
  isChecked: boolean;
}

export interface CompanyMotorYear {
  id: number;
  companyId: number;
  motorYearId: number;
  model: Model | null;
  motorYear: MotorYear | null;
}
