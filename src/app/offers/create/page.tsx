"use client";
import React from "react";
import { AddOfferForm } from "./AddOfferForm";
import { protectedRoute } from "@/util/protectedRoute";

function AddOffer() {
  return <AddOfferForm />;
}

export default protectedRoute(AddOffer);
