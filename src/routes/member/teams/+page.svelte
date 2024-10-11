<script lang="ts">
	import { api } from '$convex/_generated/api';
	import { Form, Query } from '$lib/components';
	import Details from '$lib/components/details.svelte';
	import InputGroup from '$lib/components/form/input-group.svelte';
	import { Team } from '$lib/items';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h2>Teams</h2>

<Details summary="Create A New Team">
	<p>
		After your team is saved you will be redirected to the payment page to setup the subscription.
	</p>
	<Form action="?/add" label="Create Team">
		<InputGroup label="Name" name="name" placeholder="Please enter your team's name" required />
	</Form>
</Details>

<Details summary="Join A Team">
	<Form action="?/join" label="Join Team">
		<InputGroup
			label="Invite Code"
			name="inviteCode"
			placeholder="Insert invite code recieved from team admin"
			required
		/>
	</Form>
</Details>

<Query
	api={api.users.getTeams}
	args={{ userId: data.user?.user_metadata._id }}
	component={Team}
	emptyText="You are not a member of any teams"
	serverData={data.teams}
/>
