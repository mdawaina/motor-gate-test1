"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import React from "react";
//import jwt from "jsonwebtoken";

//import { parseCookies } from "cookie";
import { getUser } from "@/util/getUser";
import { store, useAppDispatch } from "@/store/configureStore";
import { setUser } from "@/store/accountSlice";
import { User } from "../models/loginUser";

export const Sidebar = () => {
  // const dispatch = useAppDispatch();
  const logout = () => {
    localStorage.removeItem("token");
    Cookies.remove("currentUser");
    window.location.href = "/login";
  };
  // parse josn
  if (!getUser()) return <div></div>;
  /* const user = JSON.parse(getUser() as string);
  let claims = JSON.parse(atob(user.token.split(".")[1]));
  let roles =
    claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  roles = typeof roles === "string" ? [roles] : roles;
  const token = store.getState().account.user?.token;
  if (!token) {
    dispatch(setUser(user));
  } */

  var { roles, companyRefId }: User = getUser() as User;

  return (
    <div className="col-2 sidebar">
      {roles?.includes("Admin") && (
        <>
          <Link href="/">Home</Link>
          <Link href="/companies">Companies</Link>
          <Link href="/home/services">Services</Link>
          <Link href="/account/dashboard">Dashboard</Link>
          <Link href="/motors/brands">Brands/Models</Link>
          <Link href="/account/profile">User Profile</Link>
          <a style={{ cursor: "pointer" }} onClick={() => logout()}>
            Logout
          </a>
        </>
      )}

      {roles?.includes("Company") && (
        <>
          <Link href="/">Home</Link>

          <Link href={`/companies/${companyRefId}`}>Company Profile </Link>
          <Link href="/account/profile">User Profile</Link>
          <Link href="/motors">Motors List</Link>
          <Link href="/offers">Offers</Link>
          <a style={{ cursor: "pointer" }} onClick={() => logout()}>
            Logout
          </a>
        </>
      )}

      {roles?.includes("Customer") && (
        <>
          <Link href="/">Home</Link>

          <Link href="/account/profile">User Profile</Link>
          <Link href={`/companies/wishlist`}>Company WishList </Link>
          <Link href="/account/motors">The Garage</Link>
          <a style={{ cursor: "pointer" }} onClick={() => logout()}>
            Logout
          </a>
        </>
      )}
    </div>
  );
};
