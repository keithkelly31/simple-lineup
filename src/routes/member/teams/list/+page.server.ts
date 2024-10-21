import { error as handleError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase }, parent }) => {
  const {session} = await parent();
	const { data: teams, error } = await supabase.from("team_members").select("...teams(*)").eq("member", session?.user.id);
	if(error) return handleError(500, error);

  return {
    teams 
  };
};