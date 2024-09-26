<script lang="ts">
	import { Team } from '$components/items';
	import Query from '$components/query.svelte';
	import { api } from '$convex/_generated/api';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1>My Teams</h1>

<Query
	api={api.user.getTeams}
	args={{ userId: data.user!.user_metadata._id }}
	emptyText="You are not an active member of any teams"
	serverData={data.teams}
	component={Team}
/>
