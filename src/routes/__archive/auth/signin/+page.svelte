<script>
	import Form from '$lib/components/form.svelte';
</script>

<svelte:head>
	<title>Simple Lineup | Sign In</title>
</svelte:head>

<h1>Sign In</h1>

<Form label="Sign In">
	<label for="email">Email</label>
	<input
		required
		autocomplete="email"
		id="email"
		name="email"
		placeholder="email address"
		type="email"
	/>

	<label for="password">Password</label>
	<input
		required
		autocomplete="current-password"
		name="password"
		placeholder="password"
		type="password"
	/>
</Form>

<p><a href="/auth/signup">Need an account?</a></p>
<p><a href="/auth/forgot-password">Forgot your password?</a></p>
