<script>
	import { browser, dev } from '$app/environment';
	import '@fontsource/courier-prime';
	import '../app.scss';

	let { data } = $props();

	let permission = $state(browser && Notification.permission);
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
	/>
	{#if !dev}
		<script defer data-domain="simplelineup.com" src="https://plausible.io/js/script.js"></script>
	{/if}
</svelte:head>

<header id="top">
	<nav>
		<ul>
			<li>
				<a class="brand" href="/">
					<strong>Simple Lineup</strong>
				</a>
			</li>
		</ul>

		<ul>
			{#if data.session}
				<li>
					<a class="secondary" href="/">Home</a>
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
	<hr />
</header>

<main>
	{#if permission === 'default'}
		<article>
			Would you like to setup push notifications for this device?
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
	<hr />

	<nav>
		<ul>
			<li>&copy; Simple Lineup {new Date().getFullYear()}. All rights reserved.</li>
		</ul>
	</nav>
	<nav>
		<ul>
			<li><a href="/contact">Contact</a></li>
			<li><a href="/privacy">Privacy</a></li>
			<li><a href="/tos">Terms of Service</a></li>
		</ul>
	</nav>
</footer>

<style>
	.brand {
		font-size: x-large;
	}
</style>
