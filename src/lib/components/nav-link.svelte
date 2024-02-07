<script>
	/** @type { string } */
	export let href;

	/** @type { any } */
	export let toggle;
</script>

<li>
	<a {href} on:click={toggle}><slot /></a>
</li>
