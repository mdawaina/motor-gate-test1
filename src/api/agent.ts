import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { store } from "../store/configureStore";
import { request } from "http";
import {
  ChangePassword,
  LoginUser,
  ResetPasswordModel,
  UserParams,
} from "../components/models/loginUser";

import { PagniatedResponse } from "../components/models/pagination";
//import { ActionsModel } from "../../components/models/actionsModel";

import { useRouter } from "next/navigation";
import {
  RegisterCustomerModel,
  RegisterModel,
} from "@/components/models/registerModel";
import {
  Company,
  CompanyForUpdate,
  CompanyParams,
  FilterCompanyParams,
} from "@/components/models/company";
import { CompanyMotorYearForCreate } from "@/components/models/companyMotorYearForCreate";
import { MotorParams } from "@/components/models/motors";
import { getUser } from "@/util/getUser";
import { WishListParams } from "@/components/models/wishList";
import { CreateCustomerMotor } from "@/components/models/createCustomerMotor";
import { LookupForCrete } from "@/components/models/lookups";
import { Offer, OfferParams } from "@/components/models/offer";
import { getOfferAxiosParams } from "@/api/offerAxios";
//import { Attender } from "@/components/models/attender";
//import { EvaluationQuestions } from "@/components/models/evaluation";

//const { REACT_APP_API_ENDPOINT } = process.env;

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config: any) => {
  /*  if (getUser()) {
    var { token } = getUser();

    config.headers.Authorization = `Bearer ${token}`;
  } */
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PagniatedResponse(
        response.data,
        JSON.parse(pagination)
      );
      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status }: { data: any; status: number } = error.response!;

    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }

          toast.error(data.title);
          throw modelStateErrors.flat();
        }

        if (data.message) {
          toast.error(data.message);
          throw data.message;
        }
        if (data.data) {
          toast.error(data.data.message);
          throw data.data;
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.message);
        break;
      case 404:
        toast.error(data.message);
        break;
      case 500:
        useRouter().push("/alerts/server-error");
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) =>
    axios
      .post(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
  putForm: (url: string, data: FormData) =>
    axios
      .put(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
};

function getAxiosParams(motorParams: MotorParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", motorParams.pageNumber.toString());
  params.append("pageSize", motorParams.pageSize.toString());
  //params.append('searchTerm', userParams.searchTerm!);
  if (motorParams.searchTerm)
    params.append("searchTerm", motorParams.searchTerm);
  /*  if (userParams.attenderStatusId)
    params.append("attenderStatusId", userParams.attenderStatusId); */
  if (motorParams.companyId)
    params.append("companyId", motorParams.companyId.toString());

  return params;
}

function getCompanyParams(companyParams: FilterCompanyParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", companyParams.pageNumber.toString());
  params.append("pageSize", companyParams.pageSize.toString());
  //params.append('searchTerm', userParams.searchTerm!);
  if (companyParams.searchTerm)
    params.append("searchTerm", companyParams.searchTerm);
  /*  if (userParams.attenderStatusId)
    params.append("attenderStatusId", userParams.attenderStatusId); */
  if (companyParams.companyStatusId)
    params.append("companyStatusId", companyParams.companyStatusId.toString());
  if (companyParams.cityId)
    params.append("cityId", companyParams.cityId.toString());

  if (companyParams.sectorId)
    params.append("sectorId", companyParams.sectorId.toString());

  if (companyParams.specializationId)
    params.append(
      "specializationId",
      companyParams.specializationId.toString()
    );

  if (companyParams.servicesString)
    params.append("servicesString", companyParams.servicesString);

  return params;
}

const Account = {
  //register: (values: Attender) => requests.post("attenders/register", values),
  // addUser: (values: SingleUser) => requests.post("account/createuser", values),
  getUser: (id: string) =>
    requests.get(`/account/getuser?userid=${id ? id : ""}`),
  getUsers: (userParams: UserParams) => {
    const params = getAxiosParams(userParams);
    return requests.get(`attenders/list?${params}`);
  },

  export: (userParams: UserParams) => {
    const params = getAxiosParams(userParams);
    return requests.get(`/attenders/export?${params}`);
  },
  acceptAttender: (id: string) =>
    requests.get(`/attenders/accept?id=${id ? id : ""}`),
  rejectAttender: (id: string) =>
    requests.get(`/attenders/reject?id=${id ? id : ""}`),
  login: (values: any) => requests.post("account/login", values),
  //register: (values: any) => requests.post("account/register", values),
  currentUser: () => requests.get("account/currentUser"),
  /*     updateProfile: (values: UserForUpdate) =>
            requests.post("account/update_profile", values), */
  allUsers: (pageNumber: number | null) =>
    requests.get(`attenders/list?pageIndex=${pageNumber}`),
  blockUser: (userId: string, status: boolean) =>
    requests.post("account/block_user", { userId, status }),
  // editUser: (user: SingleUser) => requests.post("account/edit_user", user),
  changePassword: (values: ChangePassword) =>
    requests.post("account/change_password", values),
  forgotPassword: (email: string) =>
    requests.post("account/forgot_password", { email }),
  resetPassword: (resetPasswordModel: ResetPasswordModel) =>
    requests.post("account/reset_password", resetPasswordModel),

  sendOTP: (loginUser: LoginUser) =>
    requests.post("account/send_otp", {
      email: loginUser.email,
      password: loginUser.password,
    }),

  register: (values: RegisterModel) =>
    requests.post("account/register", values),
  registerCustomer: (values: RegisterCustomerModel) =>
    requests.post("account/register_customer", values),
  //resetPassword: (resetPasswordModel: ResetPasswordModel) => requests.post("account/reset_password", resetPasswordModel),
  // confirmEmail: (confirmEmailModel: ConfirmEmailModel) => requests.post("account/confirm_email", confirmEmailModel),
  // sendOTP: (loginUser: LoginUser) => requests.post("account/send_otp", { email: loginUser.email, password: loginUser.password }),
};

const Companies = {
  getCompanies: (companyParams: CompanyParams) => {
    const params = getAxiosParams(companyParams);
    return requests.get(`companies?${params}`);
  },
  getCompany: (id: string) => requests.get(`companies/get_company?id=${id}`),
  getCompanyForUpdate: (id: string) =>
    requests.get(`companies/get_company_for_update?id=${id}`),
  updateCompany: (company: CompanyForUpdate) =>
    requests.post("companies/update_company", company),
  addToWishList: (companyId: string) =>
    requests.post("companies/add_to_wishlist", { refId: companyId }),
  removeFromWishList: (companyId: string) =>
    requests.post("companies/remove_from_wishlist", { refId: companyId }),
  getWishList: (modelParams: WishListParams) => {
    const params = getAxiosParams(modelParams);

    return requests.get(`companies/get_wishlist?${params}`);
  },
  filterCompanies: (motorParams: FilterCompanyParams) => {
    const params = getCompanyParams(motorParams);
    return requests.get(`companies?${params}`);
  },
};

const Motors = {
  getMotors: () => {
    //const params = getAxiosParams(motorParams);
    return requests.get(`motors/getmotors`);
  },
  createCompanyMotorYear: (motorYear: CompanyMotorYearForCreate) =>
    requests.post("motors/addcompanymotoryear", motorYear),
  //get company motors
  getCompanyMotors: (motorParams: MotorParams) => {
    const params = getAxiosParams(motorParams);
    return requests.get(`motors/getcompanymotors?${params}`);
  },
  getCustomerMotors: (companyParams: MotorParams) => {
    const params = getAxiosParams(companyParams);
    return requests.get(`customers/get_motors`);
  },
};

const Lookups = {
  list: () => requests.get("lookups/index"),
  getSystemLookups: () => requests.get("lookups/lookups_all"),

  getRegions: () => requests.get("lookups/getregions"),
  getCityByRegion: (regionId: number) =>
    requests.get(`lookups/get_city_by_region?regionId=${regionId}`),
  getSpecializations: () => requests.get("lookups/specializations"),
  getCompanyStatuses: () => requests.get("lookups/company_statuses"),
  // get services by specialization id
  getServices: (specializationId: number[]) =>
    // serilize array of ids
    {
      var params = new URLSearchParams();
      params.append("specializationId", specializationId.toString());
      return requests.get(`lookups/services?${params}`);
    },
  // requests.get(`lookups/services?specializationId=${specializationId}`),

  getSectors: () => requests.get("lookups/sectors"),
  getCities: () => requests.get("lookups/cities"),
  getBrands: () => requests.get("lookups/brands"),
  getModelsByBrandId: (brandId: number) =>
    requests.get(`lookups/models?brandId=${brandId}`),
  getMotoryearsByModelId: (modelId: number) =>
    requests.get(`lookups/motoryears?modelId=${modelId}`),
  addLookup: (values: LookupForCrete) =>
    requests.post("lookups/addlookup", values),
  addBrand: (brand: {}) => requests.post("lookups/addbrand", brand),
  postModel: (values: any) => requests.post("lookups/addmodel", values),
  postMotorYear: (values: any) => requests.post("lookups/addmotoryear", values),
  getColors: () => requests.get("lookups/colors"),
};

const Dashboard = {
  getStatistics: () => requests.get("dashboard/index"),
};

const Customers = {
  createCustomerMotor: (motor: CreateCustomerMotor) =>
    requests.post("customers/add_motor", motor),
};

const Offers = {
  addOffer: (values: Offer) => requests.post("offers/addoffer", values),
  getOffers: (offerParams: OfferParams) => {
    const params = getOfferAxiosParams(offerParams);
    return requests.get(`offers/companyOffers?${params}`);
  },
  getOffer: (id: string) => requests.get(`offers/getoffer?id=${id}`),
  updateOffer: (values: any) => requests.post("offers/updateoffer", values),
  deleteOffer: (id: string) => requests.delete(`offers/deleteoffer?id=${id}`),
};

function createFormData(item: any) {
  let formData = new FormData();
  for (const key in item) {
    formData.append(key, item[key]);
  }
  return formData;
}
const agent = {
  Lookups,
  Account,
  Companies,
  Dashboard,
  Motors,
  Customers,
  Offers,
};

export default agent;
