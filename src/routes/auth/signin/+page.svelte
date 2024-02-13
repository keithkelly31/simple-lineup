<script>
	import { invalidateAll } from '$app/navigation';
	import Form from '$lib/components/form.svelte';

	/** @type { import("./$types").ActionData } */
	export let form;

	$: if (form?.success) {
		invalidateAll();
	}
</script>

<h1>Sign In</h1>

<Form {form} label="Sign In">
	<fieldset>
		<label for="email">Email</label>
		<input autocomplete="email" type="email" name="email" id="email" required />
	</fieldset>

	<fieldset>
		<label for="password">Password</label>
		<input autocomplete="new-password" type="password" name="password" id="password" required />
	</fieldset>
</Form>

<p><a href="/auth/signup">Need an account?</a></p>
<p><a href="/auth/forgot-password">Forgot your password?</a></p>
