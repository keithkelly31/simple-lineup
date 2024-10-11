<script lang="ts">
	import { api } from '$convex/_generated/api';
	import { Query } from '$lib/components';
	import { Message } from '$lib/items';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h2>Messages</h2>

<Query
	api={api.users.getUnreadMessages}
	component={Message}
	emptyText="You have no unread messages"
	serverData={data.messages}
/>
