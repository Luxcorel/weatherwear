import { createKysely } from "@vercel/postgres-kysely";
import type { DB } from "kysely-codegen";

export const db = createKysely<DB>();
