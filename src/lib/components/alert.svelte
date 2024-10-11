<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, type }: { children: Snippet; type: 'error' | 'info' | 'success' } = $props();
</script>

<article
	class:pico-background-red-100={type === 'error'}
	class:pico-background-azure-100={type === 'info'}
	class:pico-background-green-100={type === 'success'}
>
	{@render children()}
</article>
