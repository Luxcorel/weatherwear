import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      provider: string;
      accessToken?: string;
      expires: bigint;
    } & DefaultSession["user"];
    error?: "RefreshAccessTokenError";
  }
}
