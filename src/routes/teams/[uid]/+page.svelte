<script>
	import Details from '$lib/components/details.svelte';
	import Form from '$lib/components/form.svelte';
	import SectionNav from '$lib/components/section-nav.svelte';
	let { data } = $props();
</script>

<h4>{data.team.name}</h4>

{#if data.team.active}
	<section>
		<nav>
			<ul>
				<li>
					<a href="#games">games</a>
				</li>
				<li>
					<a href="#members">members</a>
				</li>
				{#if data.isAdmin}
					<li>
						<a href="#settings">settings</a>
					</li>
				{/if}
			</ul>
		</nav>
	</section>

	{#if data.isAdmin}
		<Details label="send alert" secondary>
			<p>
				Alerts are messages sent to all active members of your team. The members will receive an
				email with your message.
			</p>
			<Form action="?/alert" label="send alert">
				<label for="message">message</label>
				<textarea name="message" id="message" rows="5"></textarea>
			</Form>
		</Details>
	{/if}

	<section id="games">
		<SectionNav label="upcoming games" />

		{#if data.isAdmin}
			<Details label="add game">
				<Form action="?/game" label="add game">
					<label for="description">description</label>
					<input id="description" name="description" type="text" required />
				</Form>
			</Details>
		{/if}

		<ul>
			<li>there are no upcoming games</li>
		</ul>
	</section>

	<section id="members">
		<SectionNav label="members" />

		{#if data.isAdmin}
			<Details label="invite members">
				<p>
					Enter the email addresses of the members you would like to invite. Separate addresses with
					a comma.
				</p>
				<Form action="?/invite" label="send invites">
					<label for="addresses">email addresses</label>
					<input id="addresses" name="addresses" type="text" required />

					<input type="hidden" name="id" value={data.team.id} />
					<input type="hidden" name="team" value={data.team.name} />
					<input type="hidden" name="password" value={data.team.password} />
				</Form>
			</Details>
		{/if}

		<ul>
			{#each data.members as { id, first_name, last_name } (id)}
				<li>{first_name} {last_name}</li>
			{:else}
				<li>there are no members on this team</li>
			{/each}
		</ul>
	</section>

	{#if data.isAdmin}
		<section id="settings">
			<SectionNav label="settings" />

			<section>
				<h6>name</h6>

				<Form action="?/name" label="update team name">
					<label for="name">new name</label>
					<input id="name" name="name" placeholder={data.team.name} type="text" />
				</Form>
			</section>

			<section>
				<h6>subscription</h6>

				<Form action="?/subscription" label="manage subscription">
					<input type="hidden" name="customer" value={data.team.stripe_customer} />
				</Form>
			</section>
		</section>
	{/if}
{:else}
	<h5>team supbscription not active</h5>

	{#if data.isAdmin}
		<p>
			Please click the button below to complete the subscription process and activate this team.
		</p>
		<Form action="?/subscription" label="Activate Team">
			<input name="activating" type="hidden" value={true} />
			<input name="stripe_customer" type="hidden" value={data.team.stripe_customer} />
		</Form>
	{:else}
		<p>
			Please contact your team's administrator to make them aware that the subscription for this
			team is not active.
		</p>
	{/if}
{/if}
