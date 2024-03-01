<script>
	import Icon from '$lib/components/icon.svelte';

	/** @type { string } */
	export let href;

	/** @type { string } */
	export let label;
</script>

<nav>
	<ul>
		<li>
			<Icon icon="chevron_left" />
			<a {href}>{label}</a>
		</li>
	</ul>
</nav>

<style>
	li {
		align-items: center;
		color: var(--pico-primary);
		display: flex;
	}
</style>
