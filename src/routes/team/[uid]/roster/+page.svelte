<script lang="ts">
	import { api } from '$convex/_generated/api';
	import { Details, Form, InputGroup, Query } from '$lib/components';
	import { Roster } from '$lib/items';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h2>Roster</h2>

{#if data.isAdmin}
	<Details summary="Invite New Members">
		<Form action="?/invite">
			<InputGroup
				description="Separate email addresses with a comma"
				label="Email Addresses"
				name="addresses"
				placeholder="Please enter email addresses"
				required
			/>
		</Form>
	</Details>

	<div role="group">
		<button class="contrast">Reset Payments</button>
	</div>
{/if}

<Query
	api={api.team.roster}
	args={{ id: data.team._id }}
	component={Roster}
	emptyText="There are no members of this team"
	serverData={data.roster}
/>
