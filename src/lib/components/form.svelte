<script>
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

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

{#if visible}
	<article class:error={$page.form.error} class:success={$page.form.success} transition:slide>
		<div>
			<p>{$page.form.message || ''}</p>

			{#if $page.form.details}
				<p>Code: {$page.form.details.code}</p>
				<p>Details: {$page.form.details.message}</p>
			{/if}
		</div>

		<button on:click={() => (visible = false)}>X</button>
	</article>
{/if}

<style>
	article {
		align-items: flex-start;
		border: 0;
		display: flex;
		gap: var(--pico-form-element-spacing-horizontal);
		justify-content: space-between;
	}

	article button,
	article p {
		color: #fff;
	}

	article button {
		background-color: transparent;
		border: none;
		font-weight: bolder;
		padding: calc(var(--pico-form-element-spacing-vertical) * 0.5)
			calc(var(--pico-form-element-spacing-horizontal) * 0.5);
		padding-top: 0;
		width: auto;
	}

	article p:last-of-type {
		margin-bottom: 0;
	}

	article.error {
		background-color: var(--pico-color-red-600);
	}

	article.success {
		background-color: var(--pico-color-green-600);
	}
</style>
