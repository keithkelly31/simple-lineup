<script lang="ts">
	import { Avatar, NavGroup } from '$lib/components';
	import { Team } from '$stores/team.svelte';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	Team.isAdmin = data.isAdmin;
</script>

<div>
	<Avatar avatar={data.team.avatar} seed={data.team.name} />
	<h2>{data.team.name}</h2>
</div>

<NavGroup
	isAdmin={Team.isAdmin}
	links={[
		{ path: `/team/${data.team.id}/messages` },
		{ path: `/team/${data.team.id}/roster` },
		{ path: `/team/${data.team.id}/schedule` },
		{ admin: true, path: `/team/${data.team.id}/settings` }
	]}
/>

{@render children()}

<style>
	div {
		align-items: center;
		display: flex;
		gap: var(--pico-spacing);
		margin-bottom: var(--pico-typography-spacing-vertical);
	}

	h2 {
		margin-bottom: 0;
	}
</style>
