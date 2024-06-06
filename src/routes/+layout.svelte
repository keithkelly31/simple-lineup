<script>
	import '@fontsource/roboto';
	import '../app.scss';
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>

<header>
	<nav>
		<ul>
			<li>
				<a class="brand" href="/">Simple Lineup</a>
			</li>
		</ul>

		<!-- <ul>
			<li><a href="/auth/signin">Sign In</a></li>
			<li><a href="/auth/signup">Sign up</a></li>
		</ul> -->
	</nav>
</header>

<main>
	<slot />
</main>

<footer>
	<nav>
		<ul>
			<li>&copy; Simple Lineup. All rights reserved.</li>
		</ul>

		<!-- <ul>
			<li>
				<a href="/privacy">Privacy</a>
			</li>
			<li>
				<a href="/tos">Terms</a>
			</li>
		</ul> -->
	</nav>
</footer>

<style>
	:root {
		--error: var(--pico-color-red-500);
		--success: var(--pico-color-green-550);

		--pico-font-family: 'Roboto', var(--pico-font-family-sans-serif);
	}

	:global {
		body {
			display: flex;
			flex-direction: column;
			min-height: 100vh;
		}

		main {
			flex: 1;
		}

		section {
			margin-bottom: calc(var(--pico-block-spacing-vertical) * 3);
		}

		.material-symbols-outlined {
			font-variation-settings:
				'FILL' 0,
				'wght' 400,
				'GRAD' 0,
				'opsz' 24;
		}
	}

	.brand {
		font-size: calc(var(--pico-font-size) * 1.25);
		font-weight: 600;
	}

	/* header {
		background-color: var(--pico-background-color);
		border-bottom: var(--pico-border-width) solid var(--pico-muted-border-color);
		left: 0;
		padding: var(--pico-block-spacing-vertical) var(--pico-block-spacing-horizontal);
		position: fixed;
		top: 0;
		width: 100vw;
		z-index: 50;
	}

	main {
		padding: calc(var(--pico-block-spacing-vertical) * 8) var(--pico-block-spacing-horizontal)
			var(--pico-block-spacing-vertical) !important;
	} */
</style>
