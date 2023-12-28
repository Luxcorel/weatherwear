import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { KyselyAdapter } from "@auth/kysely-adapter";
import { db } from "@/db-config";
import Spotify from "@auth/core/providers/spotify";
import { TokenSet } from "@auth/core/types";

export const authConfig = {
  // @ts-ignore
  adapter: KyselyAdapter(db),
  providers: [
    GitHub,
    Spotify({ clientId: process.env.AUTH_SPOTIFY_CLIENT_ID, clientSecret: process.env.AUTH_SPOTIFY_CLIENT_SECRET }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;

      const result = await db
        .selectFrom("Account")
        .select("id")
        .select("access_token")
        .select("provider")
        .select("expires_at")
        .select("refresh_token")
        .where("Account.userId", "=", `${user.id}`)
        .executeTakeFirst();

      if (!result) {
        return session;
      }

      if (result?.provider) {
        session.user.provider = result.provider;
      }

      if (result?.access_token) {
        session.user.accessToken = result.access_token;
      }

      if (!result.expires_at || !result.provider || !result.access_token || !result.refresh_token || !result.id) {
        return session;
      }

      if (Number(result.expires_at) * 1000 < Date.now() && result.provider === "spotify") {
        try {
          const response = await fetch("https://accounts.spotify.com/api/token", {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization:
                "Basic " +
                Buffer.from(process.env.AUTH_SPOTIFY_CLIENT_ID + ":" + process.env.AUTH_SPOTIFY_CLIENT_SECRET).toString(
                  "base64",
                ),
            },
            body: new URLSearchParams({
              grant_type: "refresh_token",
              refresh_token: result.refresh_token,
            }),
            method: "POST",
          });

          const tokens: TokenSet = await response.json();

          if (!response.ok) {
            throw tokens;
          }

          //TODO: Fix the YOLO typescript:
          await db
            .updateTable("Account")
            .set({
              access_token: tokens.access_token as string,
              expires_at: BigInt(Math.floor(Date.now() / 1000 + (tokens.expires_in as number))),
              refresh_token: tokens.refresh_token ?? (result.refresh_token as string),
            })
            .where("Account.id", "=", `${result.id}`)
            .execute();
        } catch (error) {
          // The error property will be used client-side to handle the refresh token error
          session.error = "RefreshAccessTokenError";
        }
      }

      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);

      if (!isLoggedIn) {
        const redirectUrl = new URL("api/auth/signin", nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      }

      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signOut } = NextAuth(authConfig);
