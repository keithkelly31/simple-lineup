<script lang="ts">
	import Item from '$components/item.svelte';
	import type { Doc } from '$convex/_generated/dataModel';

	let team: Doc<'teams'> = $props();
	let notifications = $state(true);
</script>

<Item>
	<div>
		<a href="/team/{team._id}">{team.name}</a>

		{#if notifications}
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="12px"
					viewBox="0 -960 960 960"
					width="12px"
					fill="currentColor"
					><path
						d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
					/></svg
				>
			</span>
		{/if}
	</div>
</Item>

<style>
	div {
		align-items: center;
		display: flex;
		gap: 1rem;
		justify-content: space-between;
	}

	span {
		color: var(--error);
	}
</style>
