<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { Copyright } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import '../app.scss';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	onMount(() => {
		const { data: _data } = data.supabase.auth.onAuthStateChange((event, newSession) => {
			if (newSession?.expires_at !== data.session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => _data.subscription.unsubscribe();
	});
</script>

<header>
	<nav>
		<ul>
			<li>
				<strong><a href="/">Simple Lineup</a></strong>
			</li>
		</ul>

		<ul>
			{#if data.session}
				<li><a href="/member">Home</a></li>
				<li>
					<button
						onclick={async () => {
							await data.supabase.auth.signOut();
							invalidateAll();
						}}
						class="outline secondary">Sign Out</button
					>
				</li>
			{:else}
				<li><a href="/signin">Sign In</a></li>
				<li><a href="/signup">Sign Up</a></li>
			{/if}
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>
	<nav>
		<ul>
			<li><Copyright /> <span class="copyright">Simple Lineup. All rights reserved.</span></li>
		</ul>
	</nav>
</footer>

<style>
	header {
		background-color: var(--pico-background-color);
		border-bottom: 1px solid var(--pico-muted-border-color);
		position: sticky;
		top: 0;
		z-index: 10;
	}

	footer nav li {
		align-items: center;
		display: flex;

		.copyright {
			margin-left: calc(var(--pico-spacing) * 0.5);
		}
	}
</style>
