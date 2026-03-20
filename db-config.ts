import { createKysely } from "@vercel/postgres-kysely";
import type { Kysely } from "kysely";
import type { DB } from "@/types/db";

let dbInstance: Kysely<DB> | undefined;

function getDb() {
  dbInstance ??= createKysely<DB>();
  return dbInstance;
}

export const db = new Proxy({} as Kysely<DB>, {
  get(_target, property, receiver) {
    const value = Reflect.get(getDb(), property, receiver);
    return typeof value === "function" ? value.bind(getDb()) : value;
  },
});
