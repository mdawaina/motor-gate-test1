import React from "react";

function AccountLayout({ children }: any) {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-10">{children}</div>
        </div>
      </div>
    </>
  );
}

export default AccountLayout;
