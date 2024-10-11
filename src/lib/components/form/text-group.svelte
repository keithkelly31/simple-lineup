<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	interface Props extends HTMLTextareaAttributes {
		label: string;
	}

	let { label, ...props }: Props = $props();
</script>

<label>
	{label}
	<textarea {...props}></textarea>
</label>
