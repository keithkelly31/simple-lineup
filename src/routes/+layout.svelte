<script>
	import '@fontsource/barlow';
	import '../app.scss';

	import { browser } from '$app/environment';
	import { invalidate } from '$app/navigation';
	import Icon from '$lib/components/icon.svelte';
	import { onMount } from 'svelte';

	/** @type { import("./$types").LayoutData } */
	export let data;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	$: permission = browser && Notification.permission;

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
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
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

		<ul>
			{#if session}
				<li>
					<a class="secondary" href="/member/{session.user.id}/events"><Icon icon="event" /></a>
				</li>
				<li>
					<a class="secondary" href="/member/{session.user.id}/messages"><Icon icon="mail" /></a>
				</li>
				<li>
					<a class="secondary" href="/member/{session.user.id}"><Icon icon="cottage" /></a>
				</li>
			{:else}
				<li>
					<a class="secondary" href="/auth/signin">Sign In</a>
				</li>

				<li>
					<a class="secondary" href="/auth/signup">Sign Up</a>
				</li>
			{/if}
		</ul>
	</nav>
</header>

<main>
	{#if permission === 'default'}
		<article>
			Would you like to set up push notifications on this device?
			<footer>
				<div class="grid">
					<button>Yes</button>
					<button class="secondary">No</button>
				</div>
			</footer>
		</article>
	{/if}

	<slot />
</main>

<footer>
	<nav>
		<ul>
			<li>&copy; Simple Lineup {new Date().getFullYear()}. All rights reserved.</li>
		</ul>
		<ul>
			<li><a href="/contact">Contact</a></li>
			<li><a href="/privacy">Privacy</a></li>
			<li><a href="/tos">Terms of Service</a></li>
		</ul>
	</nav>
</footer>

<style>
	article {
		background-color: var(--pico-muted-border-color);
	}

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
