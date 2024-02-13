<script>
	import Form from '$lib/components/form.svelte';

	/** @type { import("./$types").ActionData } */
	export let form;
</script>

<h1>Sign Up</h1>

<p>
	Create a <strong>FREE</strong> account to get started. After submitting the form you will receive an
	email to confirm your signup. Once confirmed you will be ready to create your own team or join an existing
	team.
</p>

<Form {form} label="Sign Up">
	<fieldset>
		<label for="email">Email</label>
		<input autocomplete="email" type="email" name="email" id="email" required />
	</fieldset>

	<fieldset>
		<label for="password">Password</label>
		<input autocomplete="new-password" type="password" name="password" id="password" required />
	</fieldset>

	<fieldset>
		<label for="first-name">First Name</label>
		<input autocomplete="given-name" type="text" name="first_name" id="first-name" required />
	</fieldset>

	<fieldset>
		<label for="last-name">Last Name</label>
		<input autocomplete="family-name" type="text" name="last_name" id="last-name" required />
	</fieldset>
</Form>

<p><a href="/auth/signin">Already have an account?</a></p>
