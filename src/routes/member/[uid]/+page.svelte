<script>
	/** @type {import('./$types').PageData} */
	export let data;
	let { teams } = data;
	$: ({ teams } = data);
</script>

<section>
	<strong>Teams</strong>

	{#each teams as team (team.teams.id)}
		<article>
			<a href="/team/{team.teams.id}">{team.teams.name}</a>
		</article>
	{:else}
		<article>You are not an active member of any teams</article>
	{/each}
</section>
