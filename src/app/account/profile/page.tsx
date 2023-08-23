"use client";
import agent from "@/api/agent";
import { User } from "@/components/models/loginUser";
import { protectedRoute } from "@/util/protectedRoute";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

function UserProfile() {
  //define pending state
  const [pending, setPending] = useState<boolean>(false);
  //define user state
  const [user, setUser] = useState<User | null>(null);

  const initPage = useCallback(async () => {
    try {
      setPending(true);
      const dataResult = await agent.Account.getUser("");
      setUser(dataResult);
      setPending(false);
    } catch (error) {
      console.log(error);
      setPending(false);
    }
  }, []);

  useEffect(() => {
    initPage();
  }, [initPage]);

  if (pending) {
    return (
      <div className="row">
        <div className="col-12">
          <Spinner animation="border" />
        </div>
      </div>
    );
  }

  return (
    <>
      {user && (
        <>
          <div className="row">
            <div className="col-12">
              <h5>User Profile</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {/** show name of the copany with label */}
              Name: <p>{user?.displayName}</p>
              {/** show city name of the copany with label */}
              Email:
              <p>{user?.email}</p>
              {/** show vATRegNumber of the copany with label */}
              Mobile Number:
              <p>{user?.mobileNumber}</p>
              Registration Date:
              <p>{user?.createdOn}</p>
              {/** show link for change password and one for profile edit */}
              <Link href="/account/profile/edit" className="btn btn-primary">
                Edit Profile
              </Link>
              <Link
                href="/account/profile/change-password"
                className="btn btn-primary"
              >
                Change Password
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );

  /*  export async function getServerSideProps(context: any) {
    const { req } = context;
    const { cookies } = req;

    if (!cookies.token) {
      return {
        redirect: {
          destination: "/account/login", 
          permanent: false,
        },
      };
    } else {
      console.log(cookies.token);
    }

  
    return;
  }
 */
}
export default protectedRoute(UserProfile);
