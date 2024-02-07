<script>
	/** @type {import('./$types').PageData} */
	export let data;
	let { events } = data;
	$: ({ events } = data);
</script>

<h2>Schedule</h2>

{#each events as { id, name } (id)}
	<article>{name}</article>
{:else}
	<article>You have no upcoming events on the schedule</article>
{/each}
