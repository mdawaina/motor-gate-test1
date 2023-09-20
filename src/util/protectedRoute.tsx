//import { parseCookies } from 'cookie';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function protectedRoute(Component: any) {
  return function WithAuth(props: any) {
    const router = useRouter();
    const token = Cookies.get("currentUser");

    if (!token) {
      router.push("/login");
    }

    return <Component {...props} />;
  };
}
