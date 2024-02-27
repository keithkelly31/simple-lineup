<script>
	import Form from '$lib/components/form.svelte';
</script>

<h1>Contact Me</h1>

<Form label="Send Message">
	<label for="name">Your Name</label>
	<input id="name" name="name" type="text" required />

	<label for="email">Email</label>
	<input type="email" name="email" id="email" required />

	<label for="message">Message</label>
	<textarea name="message" id="message" rows="7" required></textarea>
</Form>
