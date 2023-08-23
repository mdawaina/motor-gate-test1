export interface LoginUser {
  email: string;
  password: string;
}

export interface ChangePassword {
  currentPassword: string;
  password: string;
  confirmPassword: string | null;
}

export class LoginUserValues {
  email?: string = "";
  password?: string = "";
}

export interface User {
  id: string;
  displayName: string;
  email: string;
  mobileNumber: string;
  companyRefId: string;
  token: string;
  roles: string[];
  createdOn: string;
}

export interface ResetPasswordModel {
  email: string | null;
  token: string | null;
  password: string;
  confirmPassword: string;
}

export interface UserParams {
  searchTerm?: string;
  pageNumber: number;
  pageSize: number;
  attenderStatusId?: string;
  cityId?: number | null;
}
