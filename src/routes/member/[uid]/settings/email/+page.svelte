<script>
	import Form from '$lib/components/form.svelte';
</script>

<h3>Update Email</h3>

<Form label="Update">
	<label for="email">Email</label>
	<input
		aria-describedby="emal-helper"
		autocomplete="email"
		type="email"
		name="email"
		id="email"
		required
	/>
	<small id="email-helper">Please enter your new email address</small>
</Form>
