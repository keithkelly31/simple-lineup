<script>
	import Form from '$lib/components/form.svelte';

	export let data;
	let { team } = data;
	$: ({ team } = data);
</script>

<h3>Send Invites</h3>

<Form label="Send Invites">
	<label for="addresses">Email Addresses</label>
	<input id="addresses" name="addresses" type="text" required />

	<input type="hidden" name="id" value={team.id} />
	<input type="hidden" name="team" value={team.name} />
	<input type="hidden" name="password" value={team.password} />
</Form>
