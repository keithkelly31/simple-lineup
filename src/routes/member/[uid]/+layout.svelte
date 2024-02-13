<script>
	import { page } from '$app/stores';
	import NavLink from '$lib/components/nav-link.svelte';
	import Nav from '$lib/components/nav.svelte';

	/** @type { import("./$types").PageParentData } */
	export let data;
	let { session } = data;
	$: ({ session } = data);
</script>

<h1>{session?.user.user_metadata.first_name} {session?.user.user_metadata.last_name}</h1>

<Nav let:toggle summary="Menu">
	<NavLink href="/member/{$page.params.uid}/messages" {toggle}>Messages</NavLink>
	<NavLink href="/member/{$page.params.uid}/notifications" {toggle}>Notifications</NavLink>
	<NavLink href="/member/{$page.params.uid}/schedule" {toggle}>Schedule</NavLink>
	<NavLink href="/member/{$page.params.uid}/settings" {toggle}>Settings</NavLink>
	<NavLink href="/member/{$page.params.uid}/teams" {toggle}>Teams</NavLink>
	<hr />
	<NavLink href="/auth/signout" {toggle}>Sign Out</NavLink>
</Nav>

<slot />
