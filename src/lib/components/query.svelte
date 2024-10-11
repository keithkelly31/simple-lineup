<script lang="ts">
	import type { Doc, TableNames } from '$convex/_generated/dataModel';
	import { loadData } from '$lib/helpers.svelte';
	import type { FunctionReference } from 'convex/server';
	import { CircleSlash } from 'lucide-svelte';
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

<section>
	{#each data.data as item (item._id)}
		<Component {...item} />
	{:else}
		<article>
			<CircleSlash />
			<div>{emptyText}</div>
		</article>
	{/each}
</section>

<style>
	article {
		align-items: center;
		display: flex;
		gap: calc(var(--pico-spacing) * 0.5);
	}
</style>
