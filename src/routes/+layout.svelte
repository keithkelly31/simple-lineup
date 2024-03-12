<script>
	import '@fontsource/roboto';
	import '../app.scss';

	let { data } = $props();
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
	/>
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
