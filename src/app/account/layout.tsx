import React from "react";
import { ToastContainer } from "react-toastify";

function AccountLayout({ children }: any) {
  return (
    <>
      {/*  <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <div className="container register-container">
        <div className="row">{children}</div>
      </div> */}

      <div className="container-fluid">
        <div className="row">
          <div className="col-10">{children}</div>
        </div>
      </div>
    </>
  );
}

export default AccountLayout;
