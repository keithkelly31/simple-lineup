<script>
	import { page } from '$app/stores';
	import NavHead from '$lib/components/nav-head.svelte';
	import NavLink from '$lib/components/nav-link.svelte';
	import Nav from '$lib/components/nav.svelte';

	/** @type { import("./$types").PageParentData } */
	export let data;
	let { session } = data;
	$: ({ session } = data);
</script>

<h1>{session?.user.user_metadata.first_name} {session?.user.user_metadata.last_name}</h1>

<Nav let:toggle summary="Menu">
	<NavHead>Events</NavHead>
	<NavLink href="/member/{$page.params.uid}/events" {toggle}>Upcoming Events</NavLink>
	<hr />
	<NavHead>Messages</NavHead>
	<NavLink href="/member/{$page.params.uid}/messages" {toggle}>Unread Messages</NavLink>
	<hr />
	<NavHead>Teams</NavHead>
	<NavLink href="/member/{$page.params.uid}/teams" {toggle}>My Teams</NavLink>
	<NavLink action href="/team/create" {toggle}>Create A Team</NavLink>
	<NavLink action href="/team/join" {toggle}>Join A Team</NavLink>
	<hr />
	<NavHead>Settings</NavHead>
	<NavLink href="/member/{$page.params.uid}/settings/email" {toggle}>Email</NavLink>
	<NavLink href="/member/{$page.params.uid}/settings/password" {toggle}>Password</NavLink>
	<hr />
	<NavLink action href="/auth/signout" {toggle}>Sign Out</NavLink>
</Nav>

<slot />
