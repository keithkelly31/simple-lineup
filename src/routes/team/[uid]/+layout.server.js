import { error } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ parent }) {
	const { session } = await parent();

	// Check team members to see if the current user is part of the team
	const isMember = true; // This would be replaced by a Supabase fetch

	if (!isMember) throw error(401, 'You are not a member of this team');

	const team = {
		admin: 1, // Member uuid
		id: 1,
		name: 'Team 1'
	};

	const isAdmin = session.user.id === team.admin;

	const unreadMessages = 10; // Get count from Supabase for unread team messages

	return { isAdmin, team, unreadMessages };
}
