import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const addTeamMember = mutation({
	args: { member: v.id('users'), team: v.id('teams') },
	handler: async (ctx, { member, team }) => {
		await ctx.db.insert('team_members', { member, team });
	}
});

export const checkMembership = query({
	args: { teamId: v.id('teams'), userId: v.id('users') },
	handler: async (ctx, { teamId, userId }) => {
		const check = await ctx.db
			.query('team_members')
			.filter((q) => q.and(q.eq(q.field('user'), userId), q.eq(q.field('team'), teamId)))
			.first();
		return check ? true : false;
	}
});

export const createTeam = mutation({
	args: { admin: v.id('users'), name: v.string() },
	handler: async (ctx, { admin, name }) => {
		return await ctx.db.insert('teams', { admin, name });
	}
});

export const get = query({
	args: { id: v.id('teams') },
	handler: async (ctx, { id }) => {
		return await ctx.db.get(id);
	}
});

export const getRoster = query({
	args: { id: v.id('teams') },
	handler: async (ctx, { id }) => {
		const docs = await ctx.db
			.query('team_members')
			.filter((q) => q.eq(q.field('team'), id))
			.collect();
		let promises: Promise<any>[] = [];
		docs.map((d) => promises.push(ctx.db.get(d.member)));
		const members = await Promise.all(promises);
		return members.sort((a, b) => a.lastName.localeCompare(b.lastName));
	}
});

export const updateStripeCustomer = mutation({
	args: { stripeCustomer: v.string(), teamId: v.id('teams') },
	handler: async (ctx, { stripeCustomer, teamId }) => {
		await ctx.db.patch(teamId, { stripeCustomer });
	}
});
