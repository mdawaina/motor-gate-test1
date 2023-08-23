// hoc/withAuth.js
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/store/configureStore";
import { setUser } from "@/store/accountSlice";

const withAuth = (WrappedComponent: any) => {
  return function WithAuthComponent(props: any) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useAppSelector((state) => state.account);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
      if (!user) {
        const user = JSON.parse(localStorage.getItem("user")!);

        if (user) {
          dispatch(setUser(user));
        } else {
          router.push("/login");
        }
      }
      setLoading(false);
    }, [user, dispatch, router]);

    if (loading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
