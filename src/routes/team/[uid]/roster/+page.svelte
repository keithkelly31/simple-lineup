<script lang="ts">
	import { Details, Form, InputGroup } from '$lib/components';
	import { Roster } from '$lib/items';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h2>Roster</h2>

{#if data.isAdmin}
	<Details summary="Invite New Members">
		<Form action="?/invite">
			<InputGroup
				description="Separate email addresses with a comma"
				label="Email Addresses"
				name="addresses"
				placeholder="Please enter email addresses"
				required
			/>
		</Form>
	</Details>
{/if}

{#each data.roster as member}
	<Roster {member} />
{:else}
	<article>There are no members of this team</article>
{/each}
