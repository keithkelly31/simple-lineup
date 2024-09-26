<script lang="ts">
	import { Event } from '$components/items';
	import Query from '$components/query.svelte';
	import { api } from '$convex/_generated/api';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1>Upcoming Events</h1>

<Query
	api={api.user.getUpcomingEvents}
	emptyText="You don't have any upcoming events"
	serverData={data.events}
	component={Event}
/>
