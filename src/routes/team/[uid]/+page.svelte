<script>
	import Details from '$lib/components/details.svelte';
	import Form from '$lib/components/form.svelte';
	import SectionNav from '$lib/components/section-nav.svelte';
	let { data } = $props();
	let open = $state(false);
	let password = $state(data.team.password);
</script>

<h4>{data.team.name}</h4>

{#if data.subscription?.status === 'active'}
	<section>
		<nav>
			<ul>
				<li>
					<a href="#events">events</a>
				</li>
				<li>
					<a href="#messages">messages</a>
				</li>
				<li>
					<a href="#members">members</a>
				</li>
				<li>
					<a href="#tasks">tasks</a>
				</li>
				{#if data.isAdmin}
					<li>
						<a href="#settings">settings</a>
					</li>
				{/if}
			</ul>
		</nav>
	</section>

	<section id="events">
		<SectionNav label="upcoming events" />

		{#if data.isAdmin}
			<Details label="add event">
				<Form action="?/event" label="add event">
					<label for="description">description</label>
					<input id="description" name="description" type="text" required />
				</Form>
			</Details>
		{/if}

		<ul>
			<li>there are no upcoming events</li>
		</ul>
	</section>

	<section id="messages">
		<SectionNav label="messages" />

		<Details label="send message">
			{#if !open}
				<section>
					<button class="secondary" on:click={() => (open = true)}>select recipients</button>
				</section>
			{/if}

			<dialog {open}>
				<article>
					<header>
						<strong>choose recipients</strong>
						<button aria-label="Close" rel="prev" on:click={() => (open = false)}></button>
					</header>
					<p>insert members</p>
				</article>
			</dialog>

			<Form action="?/send" label="send message">
				<label for="subject">subject</label>
				<input id="subject" name="subject" type="text" required />

				<label for="text">message</label>
				<textarea name="text" id="text" rows="7" required></textarea>
			</Form>
		</Details>

		<ul>
			<li>you have no messages</li>
		</ul>
	</section>

	<section id="members">
		<SectionNav label="members" />

		{#if data.isAdmin}
			<Details label="invite members">
				<Form label="send invites">
					<label for="addresses">email addresses</label>
					<input id="addresses" name="addresses" type="text" required />

					<input type="hidden" name="id" value={data.team.id} />
					<input type="hidden" name="team" value={data.team.name} />
					<input type="hidden" name="password" value={data.team.password} />
				</Form>
			</Details>
		{/if}

		<ul>
			<li>there are no members on this team</li>
		</ul>
	</section>

	<section id="tasks">
		<SectionNav label="tasks" />
		<ul>
			<li>you have no tasks</li>
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
				<h6>password</h6>
				<Form label="update team password" reset={false}>
					<label for="password">new password</label>
					<input bind:value={password} id="password" name="password" type="text" />

					<fieldset>
						<button
							class="secondary"
							on:click={() =>
								(password =
									Math.random().toString(36).substring(2, 15) +
									Math.random().toString(36).substring(2, 15))}>Generate A Random Password</button
						>
					</fieldset>
				</Form>
			</section>

			<section>
				<h6>subscription</h6>

				<Form label="manage subscription">
					<input type="hidden" name="customer" value={data.team.stripe_customer} />
					<input type="hidden" name="id" value={data.team.id} />
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
		<Form action="?/activate" label="Activate Team">
			<input name="stripe_customer" type="hidden" value={data.team.stripe_customer} />
		</Form>
	{:else}
		<p>
			Please contact your team's administrator to make them aware that the subscription for this
			team is not active.
		</p>
	{/if}
{/if}
