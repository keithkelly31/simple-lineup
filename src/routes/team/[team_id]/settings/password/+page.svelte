<script>
	import Form from '$lib/components/form.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	let { team } = data;
	$: ({ team } = data);

	let password = team.password;
</script>

<h4>Password</h4>

<Form label="Update Team Password" reset={false}>
	<label for="password">New Password</label>
	<input bind:value={password} id="password" name="password" type="text" />

	<fieldset>
		<button
			class="secondary"
			on:click={() =>
				(password =
					Math.random().toString(36).substring(2, 15) +
					Math.random().toString(36).substring(2, 15))}>Generate A Random Password</button
		>
	</fieldset>
</Form>
