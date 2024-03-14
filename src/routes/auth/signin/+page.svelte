<script>
	import Form from '$lib/components/form.svelte';
</script>

<svelte:head>
	<title>simple lineup | sign in</title>
</svelte:head>

<h1>sign in</h1>

<Form label="sign in">
	<fieldset>
		<label for="email">email</label>
		<input autocomplete="email" type="email" name="email" id="email" required />
	</fieldset>

	<fieldset>
		<label for="password">password</label>
		<input autocomplete="new-password" type="password" name="password" id="password" required />
	</fieldset>
</Form>

<p><a href="/auth/signup">need an account?</a></p>
<p><a href="/auth/forgot-password">forgot your password?</a></p>
