<script>
	/** @type { import("./$types").PageData } */
	export let data;
	let { teams } = data;
	$: ({ teams } = data);
</script>

<h2>My Teams</h2>

{#each teams as team (team.teams.id)}
	<article>
		<a href="/team/{team.teams.id}">{team.teams.name}</a>
	</article>
{:else}
	<article>
		<p>You are not an active member of any teams.</p>
		<nav>
			<ul>
				<li><a href="/team/create">Create A Team</a></li>
				<li><a href="/team/join">Join A Team</a></li>
			</ul>
		</nav>
	</article>
{/each}
