<script>
	import Details from '$lib/components/details.svelte';
	import Form from '$lib/components/form.svelte';
	import SectionNav from '$lib/components/section-nav.svelte';
	let { data } = $props();
	let password = $state(
		Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
	);
</script>

<section>
	<nav>
		<ul>
			<li>
				<a href="#games">games</a>
			</li>
			<li>
				<a href="#teams">teams</a>
			</li>
			<li>
				<a href="#settings">settings</a>
			</li>
			<li>
				<a href="/auth/signout" class="secondary">sign out</a>
			</li>
		</ul>
	</nav>
</section>

<section id="games">
	<SectionNav label="upcoming games" />
	<article>you have no upcoming games</article>
</section>

<section id="teams">
	<SectionNav label="my teams" />

	{#each data.teams.sort( (a, b) => a.teams.name.localeCompare(b.teams.name) ) as { teams: { id, name } } (id)}
		<article>
			<a href="/teams/{id}">{name}</a>
		</article>
	{:else}
		<article>you are not a member of any teams</article>
	{/each}

	<Details label="create a team">
		<p>
			Enter your team's name and click the "create a team" button. Once your team is created in the
			system you will be redirected to the payment processing page to setup your team's
			subscription.
		</p>

		<Form action="?/create" label="create a team">
			<label for="name">name</label>
			<input type="text" name="name" id="name" required />
		</Form>
	</Details>

	<Details label="join a team" secondary>
		<Form label="Join Team">
			<label for="id">Team Id</label>
			<input id="id" name="id" type="text" required />

			<label for="password">Team Password</label>
			<input id="password" name="password" type="text" required />
		</Form>
	</Details>
</section>

<section id="settings">
	<SectionNav label="settings" />

	<section>
		<h6>update email</h6>
		<Form action="?/email" label="update email">
			<label for="email">email</label>
			<input
				aria-describedby="emal-helper"
				autocomplete="email"
				type="email"
				name="email"
				id="email"
				placeholder={data.session?.user.email}
				required
			/>
			<small id="email-helper">Please enter your new email address</small>
		</Form>
	</section>

	<section>
		<h6>update password</h6>
		<Form action="?/password" label="update password">
			<label for="password">password</label>
			<input
				aria-describedby="password-helper"
				autocomplete="new-password"
				type="password"
				name="password"
				id="password"
				required
			/>
			<small id="password-helper">please enter your new password</small>

			<label for="confirm-password">confirm password</label>
			<input
				aria-describedby="confirm-helper"
				type="password"
				name="confirm-password"
				id="confirm-password"
				required
			/>
			<small id="confirm-helper">please confirm the new password you entered</small>
		</Form>
	</section>
</section>
