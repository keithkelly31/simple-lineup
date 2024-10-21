<script lang="ts">
	import { Details, Form, InputGroup } from '$lib/components';
	import { Message } from '$lib/items';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
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

{#each data.messages as message}
	<Message {message} />
{:else}
	<article>There are no messages</article>
{/each}
