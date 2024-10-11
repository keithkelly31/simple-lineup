<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, summary }: { children: Snippet; summary: string } = $props();
</script>

<details>
	<summary class="outline secondary" role="button">{summary}</summary>

	<div>
		{@render children()}
	</div>
</details>

<style>
	div {
		background-color: var(--pico-card-background-color);
		border: 1px solid var(--pico-muted-border-color);
		padding: var(--pico-spacing);
	}

	details[open] summary {
		margin-bottom: 0;
	}
</style>
