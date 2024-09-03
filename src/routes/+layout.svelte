<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { setupConvex } from 'convex-svelte';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import '../app.scss';
	import type { LayoutData } from './$types';

	setupConvex(PUBLIC_CONVEX_URL);

	interface Props {
		children: Snippet;
		data: LayoutData;
	}

	let { children, data }: Props = $props();

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
			<li><strong><a href="/">Simple Lineup</a></strong></li>
		</ul>

		<ul>
			{#if data.session}
				<li><a href="/member/dashboard">Dashboard</a></li>
				<li><button onclick={async () => await data.supabase.auth.signOut()}>Sign Out</button></li>
			{:else}
				<li><a href="/auth/signin">Sign In</a></li>
				<li><a href="/auth/signup">Sign Up</a></li>
			{/if}
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>
	<span>© Simple Lineup. All rights reserved.</span>
</footer>
