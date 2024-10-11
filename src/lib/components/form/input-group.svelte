<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		description?: string;
		label: string;
	}

	let { description, label, ...props }: Props = $props();
</script>

<label>
	{label}
	<input {...props} type={props.type || 'text'} />
	{#if description}
		<small>{description}</small>
	{/if}
</label>
