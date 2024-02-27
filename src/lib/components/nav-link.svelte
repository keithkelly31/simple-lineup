<script>
	import { goto } from '$app/navigation';

	/** @type { boolean } */
	export let action = false;

	/** @type { string } */
	export let href;

	/** @type { any } */
	export let toggle;

	function click() {
		toggle();
		goto(href);
	}
</script>

<li>
	<a class:action {href} on:click={toggle}>
		<span><slot /></span>
		<span class="material-symbols-outlined"> chevron_right </span>
	</a>
</li>

<style>
	a {
		align-items: center;
		display: flex !important;
		justify-content: space-between;
	}

	.action {
		color: var(--pico-primary);
		font-weight: 700;
	}
</style>
