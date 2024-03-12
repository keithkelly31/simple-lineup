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
		</ul>
	</nav>
</section>

<section id="games">
	<SectionNav label="upcoming games" />
	<ul>
		<li>you have no upcoming games</li>
	</ul>
</section>

<section id="teams">
	<SectionNav label="my teams" />

	<Details label="create a team">
		<p>
			Enter your team's name and click the "create a team" button. Once your team is created in the
			system you will be redirected to the payment processing page to setup your team's
			subscription.
		</p>

		<Form action="?/create" label="create a team">
			<label for="name">name</label>
			<input type="text" name="name" id="name" required />

			<label for="password">password</label>
			<input bind:value={password} id="password" name="password" type="text" required />
			<small
				>The password is used for new members to join the team and help to prevent anyone from
				joining that you didn't invite. You can set your own or use the one generated.</small
			>
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

	<ul>
		{#each data.teams as { teams: { id, name } } (id)}
			<li>
				<a href="/teams/{id}">{name}</a>
			</li>
		{:else}
			<li>you are not a member of any teams</li>
		{/each}
	</ul>
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
