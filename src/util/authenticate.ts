import { verify } from "jsonwebtoken";
//import { parseCookies } from "cookie";

export function authenticate(req: any) {
  //const cookies = parseCookies(req);
  const { cookies } = req;
  const token = cookies.token;

  if (!token) {
    return null; // User is not authenticated
  }

  try {
    // const decodedToken = verify(token, "your-secret-key"); // Verify and decode the token using your secret key
    const { userId } = cookies.id; //decodedToken; // Assuming the token contains the user ID
    return { userId }; // Return the user object or identifier
  } catch (error) {
    return null; // Invalid token or token verification failed
  }
}
