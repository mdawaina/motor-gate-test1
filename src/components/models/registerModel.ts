export interface RegisterModel {
  id: number;
  email: string;
  password: string;
  displayName: string;
  name: string;
  cityId: number;
  vATRegNumber: string;
  cr: string;
  address: string;
  mobileNumber: string;
  // region: string;
  district: string;
  userType: number;
}

export interface RegisterCustomerModel {
  id: number;
  email: string;
  password: string;
  displayName: string;
  cityId: number;
  //address: string;
  mobileNumber: string;
  //district: string;

  //userType: number;
}
