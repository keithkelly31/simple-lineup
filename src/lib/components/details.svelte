<script>
	let { label, secondary = false } = $props();
</script>

<details>
	<summary class="outline" class:secondary role="button">{label}</summary>

	<div>
		<slot />
	</div>
</details>

<style>
	details > div {
		border: var(--pico-border-width) solid var(--pico-muted-border-color);
		border-top: 0;
		border-radius: var(--pico-border-radius);
		margin-top: calc(var(--pico-border-width) * -1);
		padding: var(--pico-spacing);
	}

	details[open] > summary {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		margin-bottom: 0;
	}
</style>
