import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { LoginUser } from "@/components/models/loginUser";

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<LoginUser | null>(null);
  useEffect(() => {
    const user = Cookies.get("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);
  return currentUser;
};
