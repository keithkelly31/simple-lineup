<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h1>Create a Team</h1>

<form method="POST" use:enhance>
	<label for="name">Name</label>
	<input required id="name" name="name" placeholder="Please enter your team's name" type="text" />

	<button>Create Team</button>
</form>
