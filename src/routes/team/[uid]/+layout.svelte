<script lang="ts">
	import { page } from '$app/stores';
	import { useQuery } from 'convex-svelte';
	import type { Snippet } from 'svelte';
	import { api } from '../../../convex/_generated/api';
	import type { LayoutData } from './$types';

	interface Props {
		children: Snippet;
		data: LayoutData;
	}

	let { children, data }: Props = $props();

	const q = useQuery(api.team.get, { id: $page.params.uid });
	let team = $derived(q.data || data.team)!;
</script>

<nav>
	<ul>
		<li><h1>{team.name}</h1></li>
	</ul>

	<ul>
		<li><a href="/team/{team._id}/messages">Messages</a></li>
		<li><a href="/team/{team._id}/roster">Roster</a></li>
		<li><a href="/team/{team._id}/schedule">Schedule</a></li>
		{#if data.isAdmin}
			<li><a href="/team/{team._id}/settings">Settings</a></li>
		{/if}
	</ul>
</nav>

{@render children()}
