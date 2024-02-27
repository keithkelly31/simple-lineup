<script>
	import Form from '$lib/components/form.svelte';

	/** @type { import("./$types").PageData } */
	export let data;
	let { roster: _roster, session } = data;
	$: ({ roster: _roster, session } = data);

	let active_selected = false;
	let all_selected = false;

	/** @type { Array<string> } */
	let ids = [];

	let roster = _roster.filter(
		(/** @type {{ members: { id: string | undefined; }; }} */ m) =>
			m.members.id !== session?.user.id
	);
</script>

<h3>Send A Message</h3>

<details>
	<!-- svelte-ignore a11y-no-redundant-roles -->
	<summary class="secondary" role="button">Choose Recipients</summary>
	<div class="recipients">
		<label>
			<input
				type="checkbox"
				checked={all_selected}
				on:change={() => {
					active_selected = false;
					all_selected = !all_selected;
					ids = all_selected
						? roster.map((/** @type {{ members: { id: any; }; }} */ m) => m.members.id)
						: [];
				}}
			/>
			Select All
		</label>

		<label>
			<input
				type="checkbox"
				checked={active_selected}
				on:change={() => {
					const active = roster.filter((/** @type {{ active: any; }} */ m) => m.active);
					all_selected = false;
					active_selected = !active_selected;
					ids = active_selected
						? active.map((/** @type {{ members: { id: any; }; }} */ m) => m.members.id)
						: [];
				}}
			/>
			Only Active
		</label>

		{#each roster.filter((/** @type {{ members: { id: string | undefined; }; }} */ m) => m.members.id !== session?.user.id) as { active, members: { email, id, first_name, last_name } } (id)}
			<label>
				<input
					type="checkbox"
					checked={all_selected || (active_selected && active) || ids.includes(id)}
					on:change={() => {
						if (ids.includes(id)) {
							ids = ids.filter((i) => i !== id);
						} else {
							ids = [...ids, id];
						}
					}}
				/>
				{first_name}
				{last_name}
			</label>
		{/each}
	</div>
</details>

<Form label="Send Message">
	<label for="subject">Subject</label>
	<input id="subject" name="subject" type="text" required />

	<label for="text">Message</label>
	<textarea name="text" id="text" rows="7" required></textarea>

	<input type="hidden" name="recipients" value={ids} />
</Form>

<style>
	.recipients {
		display: grid;
		gap: var(--pico-spacing);
	}

	@media screen and (min-width: 1024px) {
		.recipients {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media screen and (min-width: 1280px) {
		.recipients {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
