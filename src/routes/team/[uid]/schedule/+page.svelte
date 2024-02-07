<script>
	import { page } from '$app/stores';
	import { format } from 'date-fns';

	/** @type { import("./$types").PageData } */
	export let data;
	let { events, isAdmin } = data;
	$: ({ events, isAdmin } = data);
</script>

<h2>Upcoming Schedule</h2>

{#if isAdmin}
	<section>
		<a href="/team/{$page.params.uid}/schedule/add" role="button">Add Event</a>
	</section>
{/if}

{#each events as { date, id, time, title } (id)}
	<article>
		<a href="/team/{$page.params.uid}/schedule/event/{id}">{title}</a>
		<div>{format(new Date(`${date}T${time}`), 'EEE MMM do @ hh:mm a')}</div>
	</article>
{:else}
	<article>There are no upcoming events</article>
{/each}
