<script lang="ts">
	import { Team } from '$lib/items';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h3>Teams List</h3>

{#each data.teams as team}
	<Team {team} />
{:else}
	<article>You are not a member of any teams</article>
{/each}
