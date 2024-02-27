<script>
	import Item from './item.svelte';

	/** @type { import("./$types").PageData } */
	export let data;
	let { isAdmin, roster, supabase, team } = data;
	$: ({ isAdmin, roster, supabase, team } = data);
</script>

{#each roster as { active, members } (members.id)}
	<Item {active} admin={isAdmin} member={members} {supabase} {team} />
{:else}
	<article>There are no members of this team</article>
{/each}
