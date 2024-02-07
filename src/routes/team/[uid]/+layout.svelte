<script>
	import { page } from '$app/stores';
	import NavLink from '$lib/components/nav-link.svelte';
	import Nav from '$lib/components/nav.svelte';

	/** @type { import("./$types").LayoutData } */
	export let data;
	let { isAdmin, team } = data;
	$: ({ isAdmin, team } = data);
</script>

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
