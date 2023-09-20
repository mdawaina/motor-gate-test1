import { Sidebar } from "@/components/layout/Sidebar";
import React from "react";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return <div className="container mt-5">{children}</div>;
}

export default HomeLayout;
