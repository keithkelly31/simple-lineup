<script lang="ts">
	import { page } from '$app/stores';
	import { useQuery } from 'convex-svelte';
	import { api } from '../../../../convex/_generated/api';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const q = useQuery(api.team.getRoster, { id: $page.params.uid });
	let roster = $derived(q.data || data.roster)!;
</script>

<h2>Roster</h2>

{#each roster as player}
	<article>{player.firstName} {player.lastName}</article>
{:else}
	<article>There are no players on this team</article>
{/each}
