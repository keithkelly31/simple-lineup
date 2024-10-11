import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const addMember = mutation({
	args: { team: v.id('teams'), user: v.id('users') },
	handler: async (ctx, { team, user }) => {
		await ctx.db.insert('team_members', { active: true, team, user });
	}
});

export const checkMembership = query({
	args: { teamId: v.id('teams'), userId: v.id('users') },
	handler: async (ctx, { teamId, userId }) => {
		let isMember = false;
		const check = await ctx.db
			.query('team_members')
			.filter((q) => q.and(q.eq(q.field('user'), userId), q.eq(q.field('team'), teamId)))
			.collect();
		if (check.length) isMember = true;
		return isMember;
	}
});

export const messages = query({
	args: {},
	handler: async (ctx, args) => {
		return [];
	}
});

export const roster = query({
	args: { id: v.id("teams") },
	handler: async (ctx, { id }) => {
		const data = await ctx.db.query("team_members").filter(q => q.eq(q.field("team"), id)).collect();
		return Promise.all(data.map(doc => ctx.db.get(doc.user))).then((values) =>
			values.filter((v) => v !== null).sort((a, b) => a.lastName.localeCompare(b.lastName)));
	}
});

export const schedule = query({
	args: {},
	handler: async (ctx, args) => {
		return [];
	}
});

export const get = query({
	args: { id: v.id('teams') },
	handler: async (ctx, { id }) => {
		return await ctx.db.get(id);
	}
});

export const updateStripeCustomer = mutation({
	args: { stripeCustomer: v.string(), teamId: v.id('teams') },
	handler: async (ctx, { stripeCustomer, teamId }) => {
		await ctx.db.patch(teamId, { stripeCustomer });
	}
});
