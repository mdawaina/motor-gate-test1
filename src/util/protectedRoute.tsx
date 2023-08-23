//import { parseCookies } from 'cookie';
import { useRouter } from "next/navigation";
// import { NextRequest } from "next/server";
import Cookies from "js-cookie";

export function protectedRoute(Component: any) {
  return function WithAuth(props: any) {
    const router = useRouter();
    const token = Cookies.get("currentUser");
    // const cookies = parseCookies();

    // Redirect to the login page if the token is not available
    if (!token) {
      // You can customize the redirect path or use the next/router query string for redirection after successful login
      router.push("/login");
      //return <div></div>;
    }

    // Render the wrapped component if the token exists
    return <Component {...props} />;
  };
}
