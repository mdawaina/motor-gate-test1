import Cookies from "js-cookie";
import { verify } from "jsonwebtoken";
import { store, useAppDispatch } from "@/store/configureStore";
import { setUser } from "@/store/accountSlice";
import { User } from "@/components/models/loginUser";

export function getUser() {
  const userString = Cookies.get("currentUser");
  if (!userString) return null;
  const dispatch = useAppDispatch();

  const user = JSON.parse(userString as string);

  //const decoded = jwt.verify(user.token, "super secret key");
  let claims = JSON.parse(atob(user.token.split(".")[1]));
  let roles =
    claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  roles = typeof roles === "string" ? [roles] : roles;
  const token = store.getState().account.user?.token;
  if (!token) {
    dispatch(setUser(user));
  }
  const userForReturn: User = {
    id: user.id,
    displayName: user.displayName,
    email: user.email,
    mobileNumber: user.mobileNumber,
    token: user.token,
    roles: roles,
    companyRefId: user.companyRefId,
    createdOn: user.createdOn,
  };

  return userForReturn;
}
