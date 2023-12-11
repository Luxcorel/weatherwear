import NextAuth from "next-auth";
import { authConfig } from "./auth-config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/me", "/api/clothes/:path*", "/api/locations/:path*", "/api/suggestions/:path*"],
};
