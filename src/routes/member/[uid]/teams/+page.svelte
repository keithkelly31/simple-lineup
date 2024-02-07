<script>
	/** @type { import("./$types").PageData } */
	export let data;
	let { teams } = data;
	$: ({ teams } = data);
</script>

<h2>Teams</h2>

<section class="grid">
	<a role="button" href="/team/create">Create Team</a>
	<a role="button" href="/team/join" class="secondary">Join Team</a>
</section>

{#each teams as { id, name } (id)}
	<article>
		<a href="/team/{id}">{name}</a>
	</article>
{:else}
	<article>You are not a member of any teams</article>
{/each}
