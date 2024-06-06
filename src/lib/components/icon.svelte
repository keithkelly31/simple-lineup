<script>
	let { icon, pointer = false, ...others } = $props();
</script>

<span class="material-symbols-outlined" class:pointer {...others}>{icon}</span>

<style>
	span {
		font-variation-settings:
			'FILL' 0,
			'wght' 400,
			'GRAD' 0,
			'opsz' 24;
	}

	.pointer {
		cursor: pointer;
	}
</style>
