import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const add = mutation({
	args: {
		email: v.string(),
		firstName: v.string(),
		lastName: v.string()
	},
	handler: async (ctx, { email, firstName, lastName }) => {
		const _id = await ctx.db.insert('users', { email, firstName, lastName });
		return _id;
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

// export const getUnreadNotifications = query({
// 	args: { userId: v.union(v.id('users'), v.null()) },
// 	handler: async (ctx, { userId }) => {
// 		if (userId)
// 			return await ctx.db
// 				.query('notifications')
// 				.filter((q) => q.and(q.eq(q.field('user'), userId), q.eq(q.field('read'), false)))
// 				.collect();
// 		return [];
// 	}
// });

export const getTeams = query({
	args: { userId: v.id('users') },
	handler: async (ctx, { userId }) => {
		const q = await ctx.db
			.query('team_members')
			.withIndex('by_user', (q) => q.eq('user', userId))
			.collect();

		return Promise.all(q.map((doc) => ctx.db.get(doc.team))).then((values) =>
			values.filter((v) => v !== null).sort((a, b) => a.name.localeCompare(b.name))
		);
	}
});
