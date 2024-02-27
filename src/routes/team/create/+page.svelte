<script>
	import Form from '$lib/components/form.svelte';

	let password =
		Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
</script>

<h1>Create A Team</h1>

<p>
	Enter your team's name and click the "Create a Team" button. Once your team is created in the
	system you will be redirected to the payment processing page to setup your team's subscription.
</p>

<Form label="Create A Team">
	<label for="name">Name</label>
	<input type="text" name="name" id="name" required />

	<label for="password">Password</label>
	<input bind:value={password} id="password" name="password" type="text" required />
	<small
		>The password is used for new members to join the team and help to prevent anyone from joining
		that you didn't invite. You can set your own or use the one generated.</small
	>
</Form>
