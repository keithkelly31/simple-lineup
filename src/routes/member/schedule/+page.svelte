<script lang="ts">
	import { Schedule } from '$lib/items';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h2>Schedule</h2>

{#each data.schedule as event}
	<Schedule {event} />
{:else}
	<article>You don't have any upcoming events</article>
{/each}
