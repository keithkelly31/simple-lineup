import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	events: defineTable({
		dateTime: v.string(),
		description: v.string(),
		location: v.string(),
		notes: v.string(),
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
		text: v.string(),
		title: v.string()
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

	notifications: defineTable({
		message: v.string(),
		read: v.boolean(),
		url: v.string(),
		user: v.id('users')
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
		email: v.string(),
		firstName: v.string(),
		lastName: v.string()
	})
});
