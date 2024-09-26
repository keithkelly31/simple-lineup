<script lang="ts">
	import type { Doc, TableNames } from '$convex/_generated/dataModel';
	import { loadData } from '$lib/helpers.svelte';
	import type { FunctionReference } from 'convex/server';
	import type { Component as ComponentType } from 'svelte';

	let {
		api,
		args = {},
		component: Component,
		emptyText = 'There are no items to display',
		serverData
	}: {
		api: FunctionReference<'query', 'public'>;
		args?: { [key: string]: string };
		emptyText?: string;
		serverData: Doc<TableNames>[];
		component: ComponentType<Doc<any>>;
	} = $props();
	const data = loadData(serverData, api, args);
</script>

{#each data.data as item (item._id)}
	<Component {...item} />
{:else}
	<article>{emptyText}</article>
{/each}
