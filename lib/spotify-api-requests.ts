import { Session } from "next-auth";

const DEFAULT_CACHE_TIME = 60;

export async function authGet(url: string, session: Session, cacheTime: number | null) {
  const cacheRevalidate = cacheTime ? cacheTime : DEFAULT_CACHE_TIME;

  return fetch(url, {
    next: {
      revalidate: cacheRevalidate,
    },
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  }).then((res) => res.json());
}
