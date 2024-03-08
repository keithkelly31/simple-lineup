<script>
	import { slide } from 'svelte/transition';

	/**
	 * @typedef { Object } Props
	 * @prop { boolean } error
	 * @prop { string } message
	 * @prop { boolean } success
	 * @prop { boolean } visible
	 */

	/** @type { Props } */
	let { error = false, message, success = false, visible = false } = $props();

	$effect(() => {
		if (success) {
			setTimeout(() => (visible = false), Math.max(Math.min(message.length * 50, 2000), 7000));
		}
	});
</script>

{#if visible}
	<article class:error class:success transition:slide>
		<div>{message}</div>

		{#if error}
			<button on:click={() => (visible = false)}>X</button>
		{/if}
	</article>
{/if}

<style>
	article {
		align-items: flex-start;
		border: 0;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		color: #fff;
		display: flex;
		gap: var(--pico-form-element-spacing-horizontal);
		justify-content: space-between;
		left: 0;
		position: fixed;
		top: 0;
		width: 100vw;
		z-index: 100;
	}

	article button,
	article span {
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

	article.error {
		background-color: var(--pico-color-red-600);
	}

	article.success {
		background-color: var(--pico-color-green-600);
	}
</style>
