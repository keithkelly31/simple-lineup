<script>
	import Form from '$lib/components/form.svelte';

	/** @type { import("./$types").ActionData } */
	export let form;
</script>

<h1>Forgot Password?</h1>

<p>
	Please enter the email address associated with your account. If the email address is in our system
	you will receive an email with instructions to reset your password.
</p>

<Form {form} label="Send Password Reset">
	<label for="email">Email</label>
	<input id="email" name="email" type="email" required />
</Form>
