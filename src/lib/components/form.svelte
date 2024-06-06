<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { createAlert } from '$lib/components/alert.svelte.ts';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { Snippet } from 'svelte';
	import Alert from './alert.svelte';

	let {
		action: _action,
		children,
		label = 'Save',
		reset = true
	}: {
		action?: string;
		children: Snippet;
		label?: string;
		reset?: boolean;
	} = $props();

	let action: string = $state(_action || $page.url.pathname);
	let alert = createAlert();
	let busy: boolean = $state(false);

	const submit: SubmitFunction = () => {
		alert.setType(null);
		busy = true;

		return async ({ result, update }) => {
			if (result.type === 'failure') {
				alert.setMessage(result.data?.message || 'An unknown error has occurred');
				alert.setType('error');
			}

			if (result.type === 'success') {
				alert.setMessage(result.data?.message || 'Action completed successfully');
				alert.setType('success');
			}

			busy = false;

			await update({ reset });
			await applyAction(result);
		};
	};
</script>

<Alert {alert} />

<form {action} method="post" use:enhance={submit}>
	{@render children()}
	<button aria-busy={busy} type="submit">{label}</button>
</form>
