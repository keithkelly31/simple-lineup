<script>
	import Form from '$lib/components/form.svelte';
</script>

<h1>Join A Team</h1>

<Form label="Join Team">
	<label for="id">Team Id</label>
	<input id="id" name="id" type="text" required />

	<label for="password">Team Password</label>
	<input id="password" name="password" type="text" required />
</Form>
