"use client";
import React from "react";
import OffersList from "./OffersList";
import { protectedRoute } from "@/util/protectedRoute";

function Offers() {
  return <OffersList />;
}

export default protectedRoute(Offers);
