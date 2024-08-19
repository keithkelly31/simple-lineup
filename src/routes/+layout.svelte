<script lang="ts">
	import '@fontsource-variable/inter';
	import type { Snippet } from 'svelte';
	import '../app.css';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<h1>Simple Lineup</h1>

<main>
	{@render children()}
</main>

<footer>© Simple Lineup. All rights reserved.</footer>
