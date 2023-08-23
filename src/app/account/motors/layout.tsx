import { Sidebar } from "@/components/layout/Sidebar";
import React from "react";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-10">{children}</div>
      </div>
    </div>
  );
}

export default HomeLayout;
