<script lang="ts">
	import { page } from '$app/stores';
	import Form from '$lib/components/form/form.svelte';
</script>

<h1>Team Error</h1>
<h2>{$page.error?.message}</h2>

{#if $page.status === 402 && $page.error?.data.isAdmin}
	<Form action="/team?/activate" label="Activate Subscription">
		<input name="teamId" type="hidden" value={$page.error.data.teamId} />
	</Form>
{/if}
