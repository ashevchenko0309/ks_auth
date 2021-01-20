
# ks_auth

## Setup

- Install postgres
- Set connection string, project name & auth table in `./constants/keystone.constants.js`
- Run migrations
- Start `yarn dev`

## Demo
To run demo for auth flow execute this script:

    CREATE SEQUENCE users_id_seq START 101;
    CREATE TYPE public.enum_users_role AS ENUM ('trainee', 'trainer', 'admin');
    CREATE TABLE public.users(
	    id integer NOT NULL DEFAULT nextval('users_id_seq'),
	    email character varying(255) COLLATE pg_catalog."default",
	    "passwordHash" character varying(255) COLLATE pg_catalog."default",
	    "createdAt" timestamp with time zone NOT NULL,
	    "updatedAt" timestamp with time zone NOT NULL,
	    role enum_users_role NOT NULL,
	    "isEmailConfirmed" boolean NOT NULL DEFAULT false,
	    CONSTRAINT users_pkey PRIMARY KEY (id),
	    CONSTRAINT users_email_key UNIQUE (email)
    )

After, insert user with `admin` creds.

    Example:
    INSERT INTO users (email, "passwordHash", "createdAt", "updatedAt", role)
    VALUES ('admin@example.com', '{hashed password}', '1970-01-01 00:00:00+00', '1970-01-01 00:00:00+00', 'admin');

After, you can login to admin UI with this creds, and create/update/delete users.

## Custom fields
### Why?
Field's like `createdAt` & `updatedAt` created as fields with hooks to update the date after some changes have been added. These fields are hidden to the user, and cannot be edited by user. After all, by default `DateTime` & `DateTimeUtc` include additional fields such as `{date}_utc`, `{date}_offset`. We already have DB schemas, and these fields are not in these schemas.
### Where?
1) createdAt - `./custom-fields/createdAt.field.js`
2) updatedAt - `./custom-fields/updatedAt.field.js`
