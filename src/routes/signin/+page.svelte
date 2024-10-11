<script lang="ts">
	import { page } from '$app/stores';
	import { Form, InputGroup } from '$lib/components';
</script>

<h1>Sign In</h1>

<Form label="Sign In">
	<InputGroup
		label="Email"
		name="email"
		placeholder="Please enter your email address"
		type="email"
		required
	/>

	<InputGroup
		label="Password"
		name="password"
		placeholder="Please enter your password"
		type="password"
		required
	/>

	<input type="hidden" name="redirectTo" value={$page.url.searchParams.get('redirectTo')} />
</Form>
