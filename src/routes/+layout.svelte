<script>
	import '@fontsource/courier-prime';
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
					<strong>simple lineup</strong>
				</a>
			</li>
		</ul>

		<ul>
			{#if data.session}
				<li>
					<a class="secondary" href="/">home</a>
				</li>
			{:else}
				<li>
					<a class="secondary" href="/auth/signin">sign in</a>
				</li>

				<li>
					<a class="secondary" href="/auth/signup">sign up</a>
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
			<li>&copy; simplelineup {new Date().getFullYear()}. all rights reserved.</li>
		</ul>
	</nav>
	<nav>
		<ul>
			<li><a href="/contact">contact</a></li>
			<li><a href="/privacy">privacy</a></li>
			<li><a href="/tos">terms of Service</a></li>
		</ul>
	</nav>
</footer>

<style>
	.brand {
		font-size: large;
	}
</style>
