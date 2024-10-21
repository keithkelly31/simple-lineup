<script lang="ts">
	import { Message } from '$lib/items';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h3>Unread Messages</h3>

{#each data.messages as message}
	<Message {message} />
{:else}
	<article>There are no unread messages</article>
{/each}
