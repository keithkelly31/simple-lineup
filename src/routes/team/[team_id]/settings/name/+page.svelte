<script>
	import Form from '$lib/components/form.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	let { team } = data;
	$: ({ team } = data);
</script>

<h4>Name</h4>

<Form label="Update Team Name">
	<label for="name">New Name</label>
	<input id="name" name="name" placeholder={team.name} type="text" />
</Form>
