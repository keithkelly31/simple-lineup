import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const add = mutation({
	args: {
		email: v.string(),
		firstName: v.string(),
		lastName: v.string()
	},
	handler: async (ctx, { email, firstName, lastName }) => {
		return await ctx.db.insert('users', { email, firstName, lastName });
	}
});

export const get = query({
	args: { id: v.id('users') },
	handler: async (ctx, { id }) => {
		await ctx.db.get(id);
	}
});

export const teams = query({
	args: { userId: v.id('users') },
	handler: async (ctx, { userId }) => {
		const q = await ctx.db
			.query('team_members')
			.filter((q) => q.eq(q.field('member'), userId))
			.collect();

		let promises: Promise<any>[] = [];
		q.map((q) => promises.push(ctx.db.get(q.team)));
		return Promise.all(promises);
	}
});

export const updateId = mutation({
	args: {
		authId: v.string(),
		id: v.id('users')
	},
	handler: async (ctx, { authId, id }) => {
		await ctx.db.patch(id, { authId });
	}
});
