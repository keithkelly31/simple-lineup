<script>
	import Form from '$lib/components/form.svelte';

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<h1>Reset Your Password</h1>

<Form {form} label="Reset Password">
	<label for="password">New Password</label>
	<input autocomplete="new-password" id="password" name="password" type="password" required />
</Form>
