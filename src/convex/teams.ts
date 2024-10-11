import { v } from 'convex/values';
import { mutation } from './_generated/server';

export const createTeam = mutation({
	args: { admin: v.id('users'), name: v.string() },
	handler: async (ctx, { admin, name }) => {
		return await ctx.db.insert('teams', { admin, name });
	}
});
