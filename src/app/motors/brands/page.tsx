"use client";
import React from "react";
import { AddBrands } from "./AddBrands";
import { protectedRoute } from "@/util/protectedRoute";

function Brands() {
  return <AddBrands />;
}

export default protectedRoute(Brands);
