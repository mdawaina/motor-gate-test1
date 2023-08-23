"use client";
import { protectedRoute } from "@/util/protectedRoute";
import React from "react";

function page() {
  return <div>This is the dashboard</div>;
}

export default protectedRoute(page);
