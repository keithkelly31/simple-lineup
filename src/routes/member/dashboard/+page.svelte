<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import { api } from '../../../convex/_generated/api';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const q = useQuery(api.user.teams, { userId: data.session?.user.user_metadata.dbId });
	let teams = $derived(q.data || data.teams);
</script>

<h1>Dashboard</h1>

<nav>
	<ul>
		<li><h2>Teams</h2></li>
	</ul>
	<ul>
		<li><a href="/team/create" role="button">Create a Team</a></li>
	</ul>
</nav>

{#each teams as team}
	<article>
		<a href="/team/{team._id}">{team.name}</a>
	</article>
{:else}
	<article>You are not a member of any teams</article>
{/each}
