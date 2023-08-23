"use client";
import { protectedRoute } from "@/util/protectedRoute";
import React from "react";
import CreateMotor from "./CreateMotor";

function CreateCustomerMotor() {
  return <CreateMotor />;
}

export default protectedRoute(CreateCustomerMotor);
