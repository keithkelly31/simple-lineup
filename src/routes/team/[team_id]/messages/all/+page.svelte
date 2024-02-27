<script>
	import { page } from '$app/stores';

	/** @type { import("./$types").PageData } */
	export let data;
	let { messages } = data;
	$: ({ messages } = data);
</script>

<h3>All</h3>

{#each messages as { created_at, id, subject, text, members: { first_name, last_name } } (id)}
	<article>
		<p><strong><a href="/team/{$page.params.team_id}/messages/{id}">{subject}</a></strong></p>
		<p>{first_name} {last_name}</p>
		<p>{text}</p>
	</article>
{:else}
	<article>You have no messages</article>
{/each}
