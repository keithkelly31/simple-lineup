<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
</script>

<h1>Team Error</h1>
<h2>{$page.status}: {$page.error?.message}</h2>

{#if $page.status === 402 && $page.error?.data.isAdmin}
	<form action="/team?/activate" method="POST" use:enhance>
		<input name="teamId" type="hidden" value={$page.error.data.teamId} />
		<input name="stripeCustomerId" type="hidden" value={$page.error.data.stripeCustomerId} />
		<button>Activate Subscription</button>
	</form>
{/if}
