"use client";
import { useAuth } from "@/app/account/useAuth";
import React from "react";
import withAuth from "../withAuthComponent";

function page() {
  // useAuth();

  return (
    <div className="col-10">
      <h1>Welcome to our website!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus
        nunc ac velit molestie, sed faucibus nunc iaculis. Donec aliquet id nunc
        et porta.
      </p>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data and return as props
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default withAuth(page);
