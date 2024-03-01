<script>
	import { slide } from 'svelte/transition';

	/** @type { string | null } */
	export let code = null;

	/** @type { string | null } */
	export let details = null;

	/** @type { boolean } */
	export let error = false;

	/** @type { string } */
	export let message;

	/** @type { boolean } */
	export let success = false;

	/** @type { boolean } */
	export let visible = false;
</script>

{#if visible}
	<article class:error class:success transition:slide>
		<div>
			<span>{message}</span>

			{#if code}
				<span>CODE: {code}.</span>
			{/if}

			{#if details}
				<span>DETAILS: {details}.</span>
			{/if}
		</div>

		<button on:click={() => (visible = false)}>X</button>
	</article>
{/if}

<style>
	article {
		align-items: flex-start;
		border: 0;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
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
