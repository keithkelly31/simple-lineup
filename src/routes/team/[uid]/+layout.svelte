<script>
	import { page } from '$app/stores';
	import Form from '$lib/components/form.svelte';
	import NavLink from '$lib/components/nav-link.svelte';
	import Nav from '$lib/components/nav.svelte';

	/** @type { import("./$types").LayoutData } */
	export let data;
	let { isAdmin, subscription, team } = data;
	$: ({ isAdmin, subscription, team } = data);
</script>

<section>
	<h1>{team.name}</h1>
	{#if subscription?.status === 'active'}
		<Nav let:toggle summary="Team Menu">
			<NavLink href="/team/{$page.params.uid}" {toggle}>Dashboard</NavLink>
			<NavLink href="/team/{$page.params.uid}/messages" {toggle}>Messages</NavLink>
			<NavLink href="/team/{$page.params.uid}/roster" {toggle}>Roster</NavLink>
			<NavLink href="/team/{$page.params.uid}/schedule" {toggle}>Schedule</NavLink>
			{#if isAdmin}
				<NavLink href="/team/{$page.params.uid}/settings" {toggle}>Settings</NavLink>
				<NavLink href="/team/{$page.params.uid}/subscription" {toggle}>Subscription</NavLink>
			{/if}
		</Nav>
	{/if}
</section>

{#if subscription?.status === 'active'}
	<slot />
{:else}
	<article>
		<hgroup>
			<h2>Subscription Not Active</h2>
			<h3>This team does not have an active subscription.</h3>
		</hgroup>
		{#if isAdmin}
			<p>
				Please click the button below to complete the subscription process and activate this team.
			</p>
			<Form action="/team/{$page.params.uid}/activate" label="Activate Team">
				<input name="id" type="hidden" value={team.id} />
				<input name="stripe_customer" type="hidden" value={team.stripe_customer} />
			</Form>
		{:else}
			<p>
				Please contact your team's administrator to make them aware that the subscription for this
				team is not active.
			</p>
		{/if}
	</article>
{/if}
