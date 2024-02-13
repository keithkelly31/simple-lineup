<script>
	import { page } from '$app/stores';
	import NavLink from '$lib/components/nav-link.svelte';
	import Nav from '$lib/components/nav.svelte';

	/** @type { import("./$types").LayoutData } */
	export let data;
	let { isAdmin, team } = data;
	$: ({ isAdmin, team } = data);
</script>

{#if team.active}
	<section>
		<h1>{team.name}</h1>
		<Nav let:toggle summary="Team Menu">
			<NavLink href="/team/{$page.params.uid}" {toggle}>Dashboard</NavLink>
			<NavLink href="/team/{$page.params.uid}/messages" {toggle}>Messages</NavLink>
			<NavLink href="/team/{$page.params.uid}/roster" {toggle}>Roster</NavLink>
			<NavLink href="/team/{$page.params.uid}/schedule" {toggle}>Schedule</NavLink>
			{#if isAdmin}
				<NavLink href="/team/{$page.params.uid}/settings" {toggle}>Settings</NavLink>
				<NavLink href="/team/{$page.params.uid}/subscription" {toggle}>Subscription</NavLink>
			{/if}
		</Nav>
	</section>

	<slot />
{:else}
	<h1>{team.name}</h1>
	<article>
		<h2>No Active Subscription</h2>

		{#if isAdmin}
			<p>
				This team does not currently have an active subscription. Please click the button below to
				setup a subscription and activate the team.
			</p>

			<p>If you beleive that this is an error, please submit a support request.</p>

			<button>Setup Subscription</button>
		{:else}
			This team does not currently have an active subscription. If you think this is an error,
			please contact your team's administrator.
		{/if}
	</article>
{/if}
