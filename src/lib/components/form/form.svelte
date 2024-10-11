<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { Snippet } from 'svelte';
	import Alert from '../alert.svelte';

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
	let busy: boolean = $state(false);
	let message: string = $state('');
	let status: 'error' | 'success' | null = $state(null);

	const submit: SubmitFunction = () => {
		busy = true;
		status = null;

		return async ({ result, update }) => {
			if (result.type === 'failure') {
				status = 'error';
				message = result.data?.message || 'An unknown error has occurred';
			}

			if (result.type === 'success') {
				status = 'success';
				message = result.data?.message || 'Action completed successfully';
			}

			busy = false;

			await update({ reset });
			await applyAction(result);
		};
	};
</script>

{#if status === 'error' || status === 'success'}
	<Alert type={status}>{message}</Alert>
{/if}

{#if $page.url.searchParams.get('message')}
	<Alert type="info">{$page.url.searchParams.get('message')}</Alert>
{/if}

<form {action} method="POST" use:enhance={submit}>
	{@render children()}
	<button aria-busy={busy} type="submit">{label}</button>
</form>
