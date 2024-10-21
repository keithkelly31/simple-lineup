<script lang="ts">
	import { NavGroup } from '$lib/components';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<h2>Teams</h2>

<NavGroup
	links={[
		{ path: '/member/teams/create' },
		{ path: '/member/teams/join' },
		{ path: '/member/teams/list' }
	]}
/>

{@render children()}
