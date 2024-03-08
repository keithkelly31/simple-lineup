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
		padding: var(--pico-spacing);
	}

	details[open] > summary {
		margin-bottom: 0;
	}
</style>
