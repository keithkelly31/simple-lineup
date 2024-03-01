<script>
	import EmptyAlert from '$lib/components/empty-alert.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	let { messages } = data;
	$: ({ messages } = data);
</script>

<h2>Unread Messages</h2>

{#each messages as message}
	<article>{message}</article>
{:else}
	<EmptyAlert text="You do not have any unread messages" />
{/each}
