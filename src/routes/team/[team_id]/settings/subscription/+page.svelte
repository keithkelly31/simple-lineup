<script>
	import Form from '$lib/components/form.svelte';

	export let data;
	let { team } = data;
	$: ({ team } = data);
</script>

<h3>Subscription</h3>

<Form label="Manage Subscription">
	<input type="hidden" name="customer" value={team.stripe_customer} />
	<input type="hidden" name="id" value={team.id} />
</Form>
