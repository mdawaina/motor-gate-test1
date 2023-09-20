export interface DashboardModel {
  companiesCount: number;
  brandsCount: number;
  servicesCount: number;
  theGarageCount: number;
  wishListCount: number;
  customersCount: number;
}

export interface StatCount {
  id: number;
  title: string;
  count: number;
}
