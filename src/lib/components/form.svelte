<script>
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Alert from './alert.svelte';

	/** @type { string } */
	export let action = $page.url.pathname;

	/** @type { string } */
	export let label = 'Save';

	/** @type { boolean } */
	export let reset = true;

	let busy = false;
	$: visible = $page.form?.error || $page.form?.success;

	/** @type { import("@sveltejs/kit").SubmitFunction } */
	function submit() {
		visible = false;
		busy = true;
		return async ({ result, update }) => {
			busy = false;

			if (result.type === 'success' && result.data?.url) {
				if (new URL(result.data.url).origin !== $page.url.origin) {
					window.location.href = result.data.url;
				}
			}

			if (result.type === 'error' || result.type === 'failure') {
				// @ts-ignore
				console.error(result.data?.details);
			}

			await update({ reset });
			await applyAction(result);
		};
	}
</script>

<form {action} method="post" use:enhance={submit}>
	<slot />
	<button aria-busy={busy} type="submit">{label}</button>
</form>

<Alert
	code={$page.form?.details.code}
	details={$page.form?.details.message}
	error={$page.form?.error}
	message={$page.form?.message}
	success={$page.form?.success}
	bind:visible
/>
