drop policy "Public profiles are viewable by everyone." on "public"."users";

drop policy "Users can insert their own profile." on "public"."users";

drop policy "Users can update own profile." on "public"."users";

revoke delete on table "public"."users" from "anon";

revoke insert on table "public"."users" from "anon";

revoke references on table "public"."users" from "anon";

revoke select on table "public"."users" from "anon";

revoke trigger on table "public"."users" from "anon";

revoke truncate on table "public"."users" from "anon";

revoke update on table "public"."users" from "anon";

revoke delete on table "public"."users" from "authenticated";

revoke insert on table "public"."users" from "authenticated";

revoke references on table "public"."users" from "authenticated";

revoke select on table "public"."users" from "authenticated";

revoke trigger on table "public"."users" from "authenticated";

revoke truncate on table "public"."users" from "authenticated";

revoke update on table "public"."users" from "authenticated";

revoke delete on table "public"."users" from "service_role";

revoke insert on table "public"."users" from "service_role";

revoke references on table "public"."users" from "service_role";

revoke select on table "public"."users" from "service_role";

revoke trigger on table "public"."users" from "service_role";

revoke truncate on table "public"."users" from "service_role";

revoke update on table "public"."users" from "service_role";

alter table "public"."event_attendees" drop constraint "event_attendees_user_fkey";

alter table "public"."users" drop constraint "users_id_fkey";

alter table "public"."message_recipients" drop constraint "message_recipients_recipient_fkey";

alter table "public"."message_replies" drop constraint "message_replies_author_fkey";

alter table "public"."messages" drop constraint "messages_author_fkey";

alter table "public"."team_members" drop constraint "team_members_member_fkey";

alter table "public"."teams" drop constraint "teams_admin_fkey";

alter table "public"."users" drop constraint "users_pkey";

drop index if exists "public"."users_pkey";

drop table "public"."users";

create table "public"."profiles" (
    "id" uuid not null,
    "updated_at" timestamp with time zone,
    "first_name" text,
    "last_name" text,
    "avatar_url" text
);


alter table "public"."profiles" enable row level security;

create table "public"."users_private" (
    "id" uuid not null,
    "updated_at" timestamp with time zone,
    "email" text
);


alter table "public"."users_private" enable row level security;

alter table "public"."event_attendees" drop column "user";

alter table "public"."event_attendees" add column "member" uuid;

alter table "public"."message_recipients" alter column "unread" drop not null;

alter table "public"."team_members" alter column "active" drop default;

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX users_private_pkey ON public.users_private USING btree (id);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."users_private" add constraint "users_private_pkey" PRIMARY KEY using index "users_private_pkey";

alter table "public"."event_attendees" add constraint "event_attendees_member_fkey" FOREIGN KEY (member) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."event_attendees" validate constraint "event_attendees_member_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."users_private" add constraint "users_private_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."users_private" validate constraint "users_private_id_fkey";

alter table "public"."message_recipients" add constraint "message_recipients_recipient_fkey" FOREIGN KEY (recipient) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."message_recipients" validate constraint "message_recipients_recipient_fkey";

alter table "public"."message_replies" add constraint "message_replies_author_fkey" FOREIGN KEY (author) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."message_replies" validate constraint "message_replies_author_fkey";

alter table "public"."messages" add constraint "messages_author_fkey" FOREIGN KEY (author) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."messages" validate constraint "messages_author_fkey";

alter table "public"."team_members" add constraint "team_members_member_fkey" FOREIGN KEY (member) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."team_members" validate constraint "team_members_member_fkey";

alter table "public"."teams" add constraint "teams_admin_fkey" FOREIGN KEY (admin) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."teams" validate constraint "teams_admin_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.profiles (id, first_name, last_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', new.raw_user_meta_data->>'avatar_url');
  insert into public.users_private (id, email)
  values (new.id, new.email);
  return new;
end;
$function$
;

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."users_private" to "anon";

grant insert on table "public"."users_private" to "anon";

grant references on table "public"."users_private" to "anon";

grant select on table "public"."users_private" to "anon";

grant trigger on table "public"."users_private" to "anon";

grant truncate on table "public"."users_private" to "anon";

grant update on table "public"."users_private" to "anon";

grant delete on table "public"."users_private" to "authenticated";

grant insert on table "public"."users_private" to "authenticated";

grant references on table "public"."users_private" to "authenticated";

grant select on table "public"."users_private" to "authenticated";

grant trigger on table "public"."users_private" to "authenticated";

grant truncate on table "public"."users_private" to "authenticated";

grant update on table "public"."users_private" to "authenticated";

grant delete on table "public"."users_private" to "service_role";

grant insert on table "public"."users_private" to "service_role";

grant references on table "public"."users_private" to "service_role";

grant select on table "public"."users_private" to "service_role";

grant trigger on table "public"."users_private" to "service_role";

grant truncate on table "public"."users_private" to "service_role";

grant update on table "public"."users_private" to "service_role";

create policy "Public profiles are viewable by everyone."
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Users can insert their own profile."
on "public"."profiles"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = id));


create policy "Users can update own profile."
on "public"."profiles"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = id));


create policy "Users can insert their own private data."
on "public"."users_private"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = id));


create policy "Users can update own private data."
on "public"."users_private"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = id));


create policy "Users can view their own private data."
on "public"."users_private"
as permissive
for select
to public
using ((( SELECT auth.uid() AS uid) = id));



