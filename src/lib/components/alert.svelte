<script>
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	/** @type { string } */
	export let message;

	/** @type { "error" | "success" } */
	export let type;

	/** @type { boolean } */
	export let visible = false;

	onMount(() => {
		if (type === 'success' && message) {
			setTimeout(() => (visible = false), Math.min(Math.max(message.length * 50, 2000), 7000));
		}
	});
</script>

{#if visible}
	<article
		class:pico-background-green-550={type === 'success'}
		class:pico-background-red-550={type === 'error'}
		transition:slide
	>
		<div class="container">
			<div class="message">{message}</div>
			{#if type === 'error'}
				<button on:click={() => (visible = false)}>X</button>
			{/if}
		</div>
	</article>
{/if}

<style>
	article {
		align-items: center;
		border-radius: 0;
		box-shadow: var(--pico-box-shadow);
		color: #fff;
		display: flex;
		left: 0;
		position: fixed;
		top: 0;
		width: 100vw;
		z-index: 50;
	}

	button {
		background-color: transparent;
		border-color: var(--pico-color-red-600);
		line-height: var(--pico-line-height);
	}

	button:hover {
		background-color: var(--pico-color-red-600);
	}

	.container {
		align-items: center;
		display: flex;
		gap: var(--pico-block-spacing-horizontal);
	}

	.message {
		flex: 1;
	}
</style>
