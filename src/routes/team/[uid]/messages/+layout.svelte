<script>
	import { page } from '$app/stores';
	import NavLink from '$lib/components/nav-link.svelte';
	import Nav from '$lib/components/nav.svelte';
</script>

<h2>Messages</h2>

<Nav let:toggle summary="Messages Menu">
	<NavLink href="/team/{$page.params.uid}/messages/all" {toggle}>All</NavLink>
	<NavLink href="/team/{$page.params.uid}/messages/unread" {toggle}>Unread</NavLink>
</Nav>

<section>
	<a href="/team/{$page.params.uid}/messages/send" role="button">Send Message</a>
</section>

<slot />
