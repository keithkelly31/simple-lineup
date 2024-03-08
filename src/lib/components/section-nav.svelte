<script>
	let { label, showTop = true } = $props();
</script>

<nav>
	<ul>
		<li><h5>{label}</h5></li>
	</ul>
	{#if showTop}
		<ul>
			<li>
				<a href="#top">
					<span>top</span>
					<i class="bi bi-arrow-up-circle"></i>
				</a>
			</li>
		</ul>
	{/if}
</nav>

<style>
	h5 {
		margin-bottom: 0;
	}
</style>
