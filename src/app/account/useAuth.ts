import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { setUser } from "@/store/accountSlice";

export function useAuth() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      const user = JSON.parse(localStorage.getItem("user")!);
      if (user) {
        //alert(token);
        dispatch(setUser(user));
      } else {
        router.push("/login");
      }
    }
  }, [user, dispatch, router]);
}
