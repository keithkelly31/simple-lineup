<script lang="ts">
	import { NavGroup } from '$lib/components';
	import { Team } from '$stores/team.svelte';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	Team.isAdmin = data.isAdmin;
</script>

<h2>{data.team.name}</h2>

<NavGroup
	isAdmin={Team.isAdmin}
	links={[
		{ path: `/team/${data.team._id}/messages` },
		{ path: `/team/${data.team._id}/roster` },
		{ path: `/team/${data.team._id}/schedule` },
		{ admin: true, path: `/team/${data.team._id}/settings` }
	]}
/>

{@render children()}
