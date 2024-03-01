<script>
	import { page } from '$app/stores';
	import Backlink from '$lib/components/backlink.svelte';
	import Form from '$lib/components/form.svelte';
	import { format } from 'date-fns';

	/** @type {import('./$types').PageData} */
	export let data;
	let { message, replies } = data;
	$: ({ message, replies } = data);
</script>

<Backlink href="/team/{$page.params.team_id}/messages/all" label="Back to messages" />

<h3>{message.messages.subject}</h3>

<article>
	<header>
		<strong>{message.members.first_name} {message.members.last_name}</strong>
		<small class="secondary">{format(message?.messages.created_at, 'MMM dd @ hh:mm a')}</small>
	</header>
	<pre>{message?.messages.text}</pre>
</article>

{#each replies as { created_at, id, text, members } (id)}
	<article>
		<header>
			<strong>{members.first_name} {members.last_name}</strong>
			<small class="secondary">{format(created_at, 'MMM dd @ hh:mm a')}</small>
		</header>
		<pre>{text}</pre>
	</article>
{/each}

<hr />

<Form label="Reply">
	<label for="message">Reply</label>
	<textarea name="message" id="message" rows="5"></textarea>
</Form>

<style>
	strong {
		display: block;
	}
</style>
