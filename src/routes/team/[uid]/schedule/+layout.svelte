<script lang="ts">
	import NavGroup from '$lib/components/nav-group.svelte';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<h2>Schedule</h2>

<NavGroup
	isAdmin={data.isAdmin}
	links={[
		{ admin: true, path: `/team/${data.team.id}/schedule/add` },
		{ path: `/team/${data.team.id}/schedule/upcoming` }
	]}
/>

{@render children()}
