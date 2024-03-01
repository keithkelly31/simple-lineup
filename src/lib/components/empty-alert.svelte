<script>
	import Icon from '$lib/components/icon.svelte';

	/** @type { string } */
	export let text;
</script>

<article>
	<Icon icon="do_not_disturb_on" large />
	<p>{text}</p>
</article>

<style>
	article {
		align-items: center;
		color: var(--pico-muted-color);
		display: flex;
		flex-direction: column;
		gap: var(--pico-block-spacing-vertical);
		justify-content: center;
	}
</style>
