<script>
	import '@fontsource-variable/quicksand';
	import '../app.scss';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	/** @type { import("./$types").LayoutData } */
	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<script defer data-domain="simplelineup.com" src="https://plausible.io/js/script.js"></script>
</svelte:head>

<header>
	<nav>
		<ul>
			<li>
				<a class="brand" href="/">
					<strong>Simple Lineup</strong>
				</a>
			</li>
		</ul>

		<!-- <ul>
			{#if session}
				<li>
					<a href="/member/{session.user.id}">Home</a>
				</li>
			{:else}
				<li>
					<a href="/auth/signin">Sign In</a>
				</li>

				<li>
					<a href="/auth/signup">Sign Up</a>
				</li>
			{/if}
		</ul> -->
	</nav>
</header>

<main>
	<slot />
</main>

<footer>
	<nav>
		<ul>
			<li>&copy; Simple Lineup {new Date().getFullYear()}. All rights reserved.</li>
		</ul>
		<ul>
			<li><a href="/privacy">Privacy</a></li>
			<li><a href="/tos">Terms of Service</a></li>
		</ul>
	</nav>
</footer>

<style>
	footer {
		border-top: var(--pico-border-width) solid var(--pico-muted-border-color);
	}

	header {
		border-bottom: var(--pico-border-width) solid var(--pico-muted-border-color);
	}

	main {
		flex: 1;
	}

	nav {
		flex-wrap: wrap;
	}

	.brand {
		font-size: x-large;
	}
</style>
