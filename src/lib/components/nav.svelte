<script>
	/** @type { string } */
	export let summary;

	/** @type { boolean } */
	let open = false;

	/**
	 * @type { function }
	 * @returns { boolean }
	 */
	const toggle = () => (open = !open);
</script>

<details class="dropdown" bind:open>
	<summary>{summary}</summary>
	<ul>
		<slot {toggle} />
	</ul>
</details>

<style>
	details {
		margin-bottom: var(--pico-block-spacing-vertical);
	}
</style>
