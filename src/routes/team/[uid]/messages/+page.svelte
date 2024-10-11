<script lang="ts">
	import { api } from '$convex/_generated/api';
	import type { Doc } from '$convex/_generated/dataModel';
	import { Form, InputGroup, Query } from '$lib/components';
	import Details from '$lib/components/details.svelte';
	import { Message } from '$lib/items';

	let { data }: { data: Doc<'messages'>[] } = $props();
</script>

<h2>Messages</h2>

<Details summary="Send A Message">
	<Form>
		<InputGroup
			label="Subject"
			name="subject"
			placeholder="Please enter your message subject"
			required
		/>
	</Form>
</Details>

<Query
	api={api.team.messages}
	component={Message}
	emptyText="You don't have any messages"
	serverData={data}
/>
