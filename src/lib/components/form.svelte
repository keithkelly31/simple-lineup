<script>
	import { enhance } from '$app/forms';

	export let reset = true;

	let busy = false;

	/** @type { import("@sveltejs/kit").SubmitFunction } */
	function submit() {
		busy = true;
		return async ({ update }) => {
			busy = false;
			update({ reset });
		};
	}
</script>

<form method="post" use:enhance={submit}>
	<slot {busy} />
</form>
