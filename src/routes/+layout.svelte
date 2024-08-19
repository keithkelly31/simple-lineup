<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.scss';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<header>
	<nav>
		<ul>
			<li>
				<strong>
					<a href="/">Simple Lineup</a>
				</strong>
			</li>
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>
	<div>© Simple Lineup. All rights reserved.</div>
</footer>
