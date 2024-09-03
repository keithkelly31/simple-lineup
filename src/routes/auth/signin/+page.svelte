<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h1>Sign In</h1>

<form
	method="POST"
	use:enhance={() => {
		return async ({ result, update }) => {
			if (result.type === 'failure') return console.error(result.data?.error);
			update();
		};
	}}
>
	<label for="email">Email</label>
	<input
		required
		id="email"
		name="email"
		placeholder="Please enter your email address"
		type="email"
	/>

	<label for="password">Password</label>
	<input
		required
		id="password"
		name="password"
		placeholder="Please enter your password"
		type="password"
	/>

	<button>Sign In</button>
</form>
