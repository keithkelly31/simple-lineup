<script>
	import Form from '$lib/components/form.svelte';
</script>

<h1>Reset Your Password</h1>

<Form label="Reset Password">
	<label for="password">New Password</label>
	<input autocomplete="new-password" id="password" name="password" type="password" required />
</Form>
