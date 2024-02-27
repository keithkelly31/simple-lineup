<script>
	import { page } from '$app/stores';
	import Form from '$lib/components/form.svelte';
	import NavHead from '$lib/components/nav-head.svelte';
	import NavLink from '$lib/components/nav-link.svelte';
	import Nav from '$lib/components/nav.svelte';

	/** @type { import("./$types").LayoutData } */
	export let data;
	let { isAdmin, subscription, team } = data;
	$: ({ isAdmin, subscription, team } = data);
</script>

<section>
	<h1>{team.name}</h1>
	{#if subscription?.status === 'active'}
		<Nav let:toggle summary="Team Menu">
			<NavLink href="/team/{$page.params.team_id}/notifications" {toggle}>Notifications</NavLink>
			<hr />

			<NavHead>Messages</NavHead>
			<NavLink href="/team/{$page.params.team_id}/messages/all" {toggle}>All</NavLink>
			<NavLink href="/team/{$page.params.team_id}/messages/unread" {toggle}>Unread</NavLink>
			<NavLink action href="/team/{$page.params.team_id}/messages/send" {toggle}
				>Send Message</NavLink
			>
			<hr />

			{#if isAdmin}
				<NavHead>Members</NavHead>
				<NavLink href="/team/{$page.params.team_id}/members" {toggle}>Members</NavLink>
				<NavLink action href="/team/{$page.params.team_id}/members/invite" {toggle}
					>Invite Members</NavLink
				>
				<hr />
			{:else}
				<NavLink href="/team/{$page.params.team_id}/members" {toggle}>Members</NavLink>
			{/if}

			{#if isAdmin}
				<NavHead>Schedule</NavHead>
				<NavLink href="/team/{$page.params.team_id}/schedule" {toggle}>Upcoming Events</NavLink>
				<NavLink action href="/team/{$page.params.team_id}/schedule/add" {toggle}>Add Event</NavLink
				>
				<hr />
			{:else}
				<NavLink href="/team/{$page.params.team_id}/schedule" {toggle}>Schedule</NavLink>
			{/if}

			{#if isAdmin}
				<NavHead>Settings</NavHead>
				<NavLink href="/team/{$page.params.team_id}/settings/name" {toggle}>Name</NavLink>
				<NavLink href="/team/{$page.params.team_id}/settings/password" {toggle}>Password</NavLink>
				<NavLink href="/team/{$page.params.team_id}/settings/subscription" {toggle}
					>Subscription</NavLink
				>
				<hr />
			{/if}

			{#if isAdmin}
				<NavHead>Tasks</NavHead>
				<NavLink href="/team/{$page.params.team_id}/tasks" {toggle}>All Tasks</NavLink>
				<NavLink action href="/team/{$page.params.team_id}/tasks/assign" {toggle}
					>Assign Tasks</NavLink
				>
				<hr />
			{:else}
				<NavLink href="/team/{$page.params.team_id}/tasks" {toggle}>Tasks</NavLink>
			{/if}
		</Nav>
	{/if}
</section>

{#if subscription?.status === 'active'}
	<slot />
{:else}
	<article>
		<hgroup>
			<h2>Subscription Not Active</h2>
			<h3>This team does not have an active subscription.</h3>
		</hgroup>
		{#if isAdmin}
			<p>
				Please click the button below to complete the subscription process and activate this team.
			</p>
			<Form action="/team/{$page.params.team_id}/activate" label="Activate Team">
				<input name="stripe_customer" type="hidden" value={team.stripe_customer} />
			</Form>
		{:else}
			<p>
				Please contact your team's administrator to make them aware that the subscription for this
				team is not active.
			</p>
		{/if}
	</article>
{/if}
