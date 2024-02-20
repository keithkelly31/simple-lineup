<script>
	import Form from '$lib/components/form.svelte';

	export let data;
	let { team } = data;
	$: ({ team } = data);
</script>

<h2>Send Invites</h2>

<Form label="Send Invites">
	<label for="addresses">Email Addresses</label>
	<input id="addresses" name="addresses" type="text" required />

	<input type="hidden" name="team" value={team.name} />
</Form>
