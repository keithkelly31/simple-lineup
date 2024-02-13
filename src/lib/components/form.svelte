<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Alert from './alert.svelte';

	/** @type { any } */
	export let form;

	/** @type { string } */
	export let label = 'Save';

	/** @type { boolean } */
	export let reset = true;

	let busy = false;

	/** @type { import("@sveltejs/kit").SubmitFunction } */
	function submit() {
		busy = true;
		return async ({ result, update }) => {
			busy = false;

			if (result.type === 'success' && result.data && result.data.url) {
				if (new URL(result.data.url).origin !== $page.url.origin) {
					window.location.href = result.data.url;
				}
			}

			update({ reset });
		};
	}
</script>

<form method="post" use:enhance={submit}>
	<slot />

	<button aria-busy={busy} type="submit">{label}</button>
</form>

<Alert
	message={form?.message}
	visible={form ? true : false}
	type={form?.error ? 'error' : 'success'}
/>
