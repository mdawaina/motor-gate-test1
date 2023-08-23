"use client";
import { protectedRoute } from "@/util/protectedRoute";
import React from "react";
import { WishListComponent } from "./WishListComponent";

function CompaniesWishList() {
  return <WishListComponent />;
}

export default protectedRoute(CompaniesWishList);
