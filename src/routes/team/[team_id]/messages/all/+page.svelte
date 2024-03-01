<script>
	import { format } from 'date-fns';

	/** @type { import("./$types").PageData } */
	export let data;
	let { messages } = data;
	$: ({ messages } = data);
</script>

<h3>All</h3>

{#each messages as { created, id, message_subject, message, sender_first_name, sender_last_name, team_id } (id)}
	<article>
		<header>
			<strong>{sender_first_name} {sender_last_name}</strong>
			<small class="secondary">{format(created, 'MMM dd @ hh:mm a')}</small>
		</header>
		<a href="/team/{team_id}/messages/{id}">{message_subject}</a>
		<p>{message}</p>
	</article>
{:else}
	<article>You have no messages</article>
{/each}

<style>
	p {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	strong {
		display: block;
	}
</style>
