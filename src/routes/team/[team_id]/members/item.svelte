<script>
	import { error } from '@sveltejs/kit';

	/** @type { boolean } */
	export let active;

	/** @type { boolean } */
	export let admin;

	/** @type { any } */
	export let member;
	let { first_name, id: member_id, last_name } = member;

	/** @type { import("@supabase/supabase-js").SupabaseClient } */
	export let supabase;

	/** @type { any } */
	export let team;
	let { admin: team_admin, id: team_id } = team;

	async function toggleActive() {
		const { error: err } = await supabase
			.from('team_members')
			.update({ active })
			.eq('member', member_id)
			.eq('team', team_id);
		if (err)
			return error(500, { message: `There was an error activating team members. ${err.message}` });
	}
</script>

<article>
	<nav>
		<ul>
			<li>{first_name} {last_name}</li>
		</ul>

		{#if admin && team_admin !== member_id}
			<ul>
				<li>
					<label>
						Active
						<input
							name="active"
							type="checkbox"
							role="switch"
							bind:checked={active}
							on:change={toggleActive}
						/>
					</label>
				</li>
			</ul>
		{/if}
	</nav>
</article>

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
