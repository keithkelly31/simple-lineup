<script lang="ts">
	import { api } from '$convex/_generated/api';
	import { Query } from '$lib/components';
	import { Schedule } from '$lib/items';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h2>Schedule</h2>

<Query
	api={api.users.getUpcomingEvents}
	component={Schedule}
	emptyText="You have no upcoming events"
	serverData={data.schedule}
/>
