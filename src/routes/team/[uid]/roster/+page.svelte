<script>
	/** @type { import("./$types").PageData } */
	export let data;
	let { isAdmin, roster, team } = data;
	$: ({ isAdmin, roster, team } = data);
</script>

<h2>Roster</h2>

{#if isAdmin}
	<section>
		<p>You can invite a member</p>

		<a href="/team/{team.id}/roster/invite" role="button">Send Invite</a>
	</section>
{/if}

{#each roster as { active, member: { id, first_name, last_name } } (id)}
	<article>
		<nav>
			<ul>
				<li>{first_name} {last_name}</li>
			</ul>
			<ul>
				<li>
					<label>
						Active
						<input name="active" type="checkbox" role="switch" bind:checked={active} />
					</label>
				</li>
			</ul>
		</nav>
	</article>
{:else}
	<article>There are no members of this team</article>
{/each}

<style>
	label {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: calc(var(--pico-spacing) * 0.5);
	}

	[type='checkbox'] {
		margin-inline-end: 0;
	}
</style>
