<script>
	import Form from '$lib/components/form.svelte';

	/** @type { import("./$types").ActionData } */
	export let form;
</script>

<h1>Create A Team</h1>

<p>
	Enter your team's name and click the "Create a Team" button. Once your team is created in the
	system you will be redirected to the payment processing page to setup your team's subscription.
</p>

<Form {form} label="Create A Team">
	<label for="name">Name</label>
	<input type="text" name="name" id="name" required />
</Form>
