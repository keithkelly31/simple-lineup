alter table "public"."profiles" alter column "first_name" set default '""'::text;

alter table "public"."profiles" alter column "first_name" set not null;

alter table "public"."profiles" alter column "last_name" set default '""'::text;

alter table "public"."profiles" alter column "last_name" set not null;


