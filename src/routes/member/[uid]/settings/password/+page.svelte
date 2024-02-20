<script>
	import Form from '$lib/components/form.svelte';
</script>

<h3>Update Password</h3>

<Form label="Update">
	<label for="password">Password</label>
	<input
		aria-describedby="password-helper"
		autocomplete="new-password"
		type="password"
		name="password"
		id="password"
		required
	/>
	<small id="password-helper">Please enter your new password</small>

	<label for="confirm-password">Confirm Password</label>
	<input
		aria-describedby="confirm-helper"
		type="password"
		name="confirm-password"
		id="confirm-password"
		required
	/>
	<small id="confirm-helper">Please confirm the new password you entered</small>
</Form>
