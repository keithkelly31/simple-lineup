<script>
	/** @type {import('./$types').PageData} */
	export let data;
	let { messages } = data;
	$: ({ messages } = data);
</script>

<h2>Messages</h2>

{#each messages as { id, name } (id)}
	<article>{name}</article>
{:else}
	<article>You have no messages</article>
{/each}
