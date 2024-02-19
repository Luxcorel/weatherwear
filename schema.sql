create table "User" (
  id uuid default gen_random_uuid() not null primary key,
  name text,
  email text not null unique,
  "emailVerified" timestamp with time zone,
  image text
);
create table "Account" (
  id uuid default gen_random_uuid() not null primary key,
  "userId" uuid not null references "User" on delete cascade,
  type text not null,
  provider text not null,
  "providerAccountId" text not null,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text
);
create index "Account_userId_index" on "Account" ("userId");
create table "Session" (
  id uuid default gen_random_uuid() not null primary key,
  "userId" uuid not null references "User" on delete cascade,
  "sessionToken" text not null unique,
  expires timestamp with time zone not null
);
create index "Session_userId_index" on "Session" ("userId");
create table "VerificationToken" (
  identifier text not null, token text not null unique,
  expires timestamp with time zone not null
);
create table "Clothing" (
  id uuid default gen_random_uuid() not null constraint "Clothing_pk" primary key,
  owner uuid not null constraint "Clothing_User_id_fk" references "User" on delete cascade,
  clothing_type varchar not null,
  usable_temperature_range integer not null constraint valid_temp_range check (
    (usable_temperature_range >= 0)
    AND (usable_temperature_range <= 3)
  ),
  name varchar not null,
  is_precipitation_proof boolean not null,
  icon_path varchar not null
);
create index "Clothing_owner_index" on "Clothing" (owner);
create table "Location" (
  id uuid default gen_random_uuid() not null constraint "Location_pk" primary key,
  owner uuid not null constraint "Location_User_id_fk" references "User" on delete cascade,
  location_name varchar not null,
  latitude double precision not null,
  longitude double precision not null
);
create index "Location_owner_index" on "Location" (owner);
