<script lang="ts">
	import { NavGroup } from '$lib/components';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<h1>Dashboard</h1>

<NavGroup
	links={[
		{ path: '/member/messages' },
		{ path: '/member/schedule' },
		{ path: '/member/settings' },
		{ path: '/member/teams' }
	]}
/>

{@render children()}
