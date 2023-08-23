import React from "react";
import { Sidebar } from "./Sidebar";

export const layout = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-10">
          <h1>Welcome to our website!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            dapibus nunc ac velit molestie, sed faucibus nunc iaculis. Donec
            aliquet id nunc et porta.
          </p>
        </div>
      </div>
    </div>
  );
};
