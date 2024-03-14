<script>
	import Form from '$lib/components/form.svelte';
</script>

<p>
	Create a <strong>FREE</strong> account to get started. After submitting the form you will receive an
	email to confirm your signup. Once confirmed you will be ready to create your own team or join an existing
	team.
</p>

<Form action="/auth/signup" label="sign up" test="sign-up-form">
	<label for="email">email</label>
	<input autocomplete="email" type="email" name="email" id="email" placeholder="email" required />

	<label for="password">password</label>
	<input
		autocomplete="new-password"
		type="password"
		name="password"
		id="password"
		placeholder="password"
		required
	/>

	<label for="first-name">first name</label>
	<input
		autocomplete="given-name"
		type="text"
		name="first_name"
		id="first-name"
		placeholder="first name"
		required
	/>

	<label for="last-name">last name</label>
	<input
		autocomplete="family-name"
		type="text"
		name="last_name"
		id="last-name"
		placeholder="last name"
		required
	/>
	<small
		>You are not requred to use your real name, but this is what is displayed across all of your
		teams. Rosters and member lists are sorted by last name.</small
	>
</Form>
