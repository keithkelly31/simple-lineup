<script lang="ts">
	import { Message } from '$lib/items';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h2>Unread Messages</h2>

{#each data.messages as message}
	<Message {message} />
{:else}
	<article>You don't have any unread messages</article>
{/each}
