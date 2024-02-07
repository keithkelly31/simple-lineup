<script>
	import Option from './option.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let push = true;
</script>

<h2>Notifications</h2>

<p>
	Choose what notifications you would like to recieve and how you would like to receive them below.
</p>

{#if !push}
	<article>
		<p>
			It looks like push notifications is not enabled for this device. If you would like the option
			to receive push notifications please enable them by clicking the button below.
		</p>
		<button>Enable Push Notifications</button>
	</article>
{/if}

<details>
	<summary>Events</summary>
	<Option
		description="Receive a notification when you receive a new message."
		pushEnabled={push}
		title="New message"
	/>
</details>

<details>
	<summary>Messages</summary>
	<Option
		description="Receive a notification when you receive a new message."
		pushEnabled={push}
		title="New message"
	/>
</details>
