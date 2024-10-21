<script lang="ts">
	import { page } from '$app/stores';

	interface Link {
		admin?: boolean;
		path: string;
	}

	let { isAdmin, links }: { isAdmin?: boolean; links: Link[] } = $props();

	let open = $state(false);

	const toggleOpen = () => {
		open = !open;
	};
</script>

{#snippet navLink({ admin, path }: Link, button: boolean = false)}
	{@const current = $page.url.pathname === path}
	{@const _path = path.split('/').pop()}
	{@const label = _path!.charAt(0).toUpperCase() + _path!.slice(1)}

	{#snippet link()}
		{#if current}
			<li><span class="pico-color-slate-200">{label}</span></li>
		{:else}
			<li><a href={path} onclick={toggleOpen}>{label}</a></li>
		{/if}
	{/snippet}

	{#if isAdmin}
		{@render link()}
	{:else if !admin}
		{@render link()}
	{/if}
{/snippet}

<nav>
	<ul>
		{#each links as link}
			{@render navLink(link)}
		{/each}
	</ul>
</nav>

<details class="dropdown" bind:open>
	<summary>Menu</summary>

	<ul>
		{#each links as link}
			{@render navLink(link)}
		{/each}
	</ul>
</details>

<hr />

<style>
	hr,
	nav {
		display: none;
	}

	@media screen and (min-width: 768px) {
		hr {
			display: block;
		}

		nav {
			display: inline-flex;
		}

		details {
			display: none;
		}
	}
</style>
