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
		return await ctx.db.get(id);
	}
});

export const getUpcomingEvents = query({
	args: {},
	handler: async (ctx) => {
		return [];
	}
});

export const getUnreadMessages = query({
	args: {},
	handler: async (ctx) => {
		return [];
	}
});

export const getUnreadNotifications = query({
	args: { userId: v.union(v.id('users'), v.null()) },
	handler: async (ctx, { userId }) => {
		if (userId)
			return await ctx.db
				.query('notifications')
				.filter((q) => q.and(q.eq(q.field('user'), userId), q.eq(q.field('read'), false)))
				.collect();
		return [];
	}
});

export const getTeams = query({
	args: { userId: v.id('users') },
	handler: async (ctx, { userId }) => {
		const q = await ctx.db
			.query('team_members')
			.filter((q) => q.eq(q.field('user'), userId))
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
