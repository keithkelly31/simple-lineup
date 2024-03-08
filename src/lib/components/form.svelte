<script>
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Alert from './alert.svelte';

	/**
	 * @typedef { Object } Props
	 * @prop { string } [action]
	 * @prop { string } label
	 * @prop { boolean } [reset]
	 */

	/** @type { Props } */
	let { action: _action, label = 'Save', reset = true } = $props();
	let action = $state(_action || $page.url.pathname);
	let busy = $state(false);
	let error = $state(false);
	let message = $state('');
	let success = $state(false);
	let visible = $state(false);

	/** @type { import("@sveltejs/kit").SubmitFunction } */
	function submit() {
		visible = false;
		busy = true;
		return async ({ result, update }) => {
			if (result.type === 'success' && result.data?.url) {
				if (new URL(result.data.url).origin !== $page.url.origin) {
					window.location.href = result.data.url;
				}
			}

			if (result.type === 'success') {
				error = false;
				success = true;
			} else {
				error = true;
				success = false;
			}

			// @ts-ignore
			message = result.data.message;
			busy = false;
			visible = true;

			await update({ reset });
			await applyAction(result);
		};
	}
</script>

<form {action} method="post" use:enhance={submit}>
	<slot />
	<button aria-busy={busy} type="submit">{label}</button>
</form>

<Alert {error} {message} {success} bind:visible />
