import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	events: defineTable({
		dateTime: v.string(),
		description: v.string(),
		location: v.string(),
		notes: v.string(),
		opponent: v.id('opponents'),
		team: v.id('teams')
	}),

	event_attendance: defineTable({
		event: v.id('events'),
		status: v.union(v.literal('in'), v.literal('maybe'), v.literal('out')),
		user: v.id('users')
	}),

	messages: defineTable({
		author: v.id('users'),
		team: v.id('teams'),
		text: v.string()
	}),

	message_recipients: defineTable({
		message: v.id('messages'),
		user: v.id('users')
	}),

	message_replies: defineTable({
		author: v.id('users'),
		message: v.id('messages'),
		text: v.string()
	}),

	opponents: defineTable({
		name: v.string(),
		team: v.id('teams')
	}),

	teams: defineTable({
		admin: v.id('users'),
		name: v.string(),
		stripeCustomer: v.optional(v.union(v.string(), v.null()))
	}),

	team_members: defineTable({
		active: v.boolean(),
		team: v.id('teams'),
		user: v.id('users')
	}),

	users: defineTable({
		authId: v.optional(v.union(v.string(), v.null())),
		email: v.string(),
		firstName: v.string(),
		lastName: v.string()
	})
});
