create policy "Enable read access for all users"
on "public"."team_members"
as permissive
for select
to authenticated
using (true);


create policy "Enable read access for all users"
on "public"."teams"
as permissive
for select
to authenticated
using (true);



