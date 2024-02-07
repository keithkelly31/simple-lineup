<script>
	import { page } from '$app/stores';
	import NavLink from '$lib/components/nav-link.svelte';
	import Nav from '$lib/components/nav.svelte';
</script>

<h2>Settings</h2>

<Nav let:toggle summary="Settings Menu">
	<NavLink href="/member/{$page.params.uid}/settings/email" {toggle}>Email</NavLink>
	<NavLink href="/member/{$page.params.uid}/settings/password" {toggle}>Password</NavLink>
</Nav>

<slot />
