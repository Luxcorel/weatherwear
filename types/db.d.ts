import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, bigint | number | string, bigint | number | string>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Account {
  access_token: string | null;
  expires_at: Int8 | null;
  id: Generated<string>;
  id_token: string | null;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  scope: string | null;
  session_state: string | null;
  token_type: string | null;
  type: string;
  userId: string;
}

export interface Clothing {
  id: Generated<string>;
  name: string;
  owner: string | null;
  precipitation_compatible: boolean;
  season: string;
  temperature_high: number;
  temperature_low: number;
}

export interface Location {
  id: Generated<string>;
  latitude: number;
  longitude: number;
  name: string;
  owner: string;
}

export interface Session {
  expires: Timestamp;
  id: Generated<string>;
  sessionToken: string;
  userId: string;
}

export interface User {
  email: string;
  emailVerified: Timestamp | null;
  id: Generated<string>;
  image: string | null;
  name: string | null;
}

export interface VerificationToken {
  expires: Timestamp;
  identifier: string;
  token: string;
}

export interface DB {
  Account: Account;
  Clothing: Clothing;
  Location: Location;
  Session: Session;
  User: User;
  VerificationToken: VerificationToken;
}
