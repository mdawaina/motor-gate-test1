import { Sidebar } from "@/components/layout/Sidebar";
import React from "react";
import { ToastContainer } from "react-toastify";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-10">{children}</div>
      </div>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
    </div>
  );
}

export default HomeLayout;
