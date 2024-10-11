<script lang="ts">
	import { api } from '$convex/_generated/api';
	import { Form, InputGroup, Query } from '$lib/components';
	import Details from '$lib/components/details.svelte';
	import { Schedule } from '$lib/items';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h2>Schedule</h2>

{#if data.isAdmin}
	<Details summary="Add New Event">
		<Form>
			<InputGroup
				label="Description"
				name="description"
				placeholder="Please enter an event description"
				required
			/>
		</Form>
	</Details>
{/if}

<Query
	api={api.team.schedule}
	component={Schedule}
	emptyText="There are no upcoming events on the schedule"
	serverData={data.schedule}
/>
