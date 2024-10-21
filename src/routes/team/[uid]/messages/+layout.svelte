<script lang="ts">
	import { NavGroup } from '$lib/components';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<h2>Messages</h2>

<NavGroup
	links={[
		{ path: `/team/${data.team.id}/messages/all` },
		{ path: `/team/${data.team.id}/messages/send` },
		{ path: `/team/${data.team.id}/messages/unread` }
	]}
/>

{@render children()}
