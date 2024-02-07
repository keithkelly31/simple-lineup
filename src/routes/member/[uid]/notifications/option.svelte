<script>
	/** @type { string } */
	export let description = '';

	/** @type { boolean } */
	export let email = false;

	/** @type { boolean } */
	export let push = false;

	/** @type { boolean } */
	export let pushEnabled = false;

	/** @type { string } */
	export let title;

	/**
	 * @function
	 * @param { "email" | "push" } type
	 */
	async function save(type) {
		console.log('Saving ' + type);
	}
</script>

<article>
	<header>
		<strong>{title}</strong>
	</header>
	<p>{description}</p>
	<footer>
		<label>
			<input bind:checked={email} type="checkbox" role="switch" on:change={() => save('email')} />
			Email
		</label>
		{#if pushEnabled}
			<label>
				<input bind:checked={push} type="checkbox" role="switch" on:change={() => save('push')} />
				Push
			</label>
		{/if}
	</footer>
</article>
