<script lang="ts">
	import Form from '$lib/components/form.svelte';

	let league: 'beer' | 'church' | 'rec' = $state('beer');

	$effect(() => {
		setInterval(() => {
			switch (league) {
				case 'beer':
					league = 'church';
					break;
				case 'church':
					league = 'rec';
					break;
				default:
					league = 'beer';
			}
		}, 2000);
	});
</script>

<svelte:head>
	<title>Simple Lineup</title>
	<meta name="description" content="" />
</svelte:head>

{#snippet leagues(league)}
	<span>{league}</span>
{/snippet}

<section>
	<h1>Simple {@render leagues(league)} league team manager.</h1>
	<h2>Easily manage your roster, schedule, communications, and accounting.</h2>
</section>

<h3>Sign up for updates</h3>
<p>
	This web app is currently in development. Sign up for email updates on the progress and more
	information about features we are developing.
</p>
<Form label="Keep Me Updated">
	<label for="email">Email</label>
	<input required autocomplete="email" id="email" name="email" type="email" />
</Form>

<style>
	h2 {
		color: var(--pico-muted-color);
		font-size: 1rem;
		font-weight: unset;
	}

	span {
		background-color: var(--pico-muted-border-color);
		border-radius: var(--pico-border-radius);
		display: inline-block;
		min-width: calc(var(--pico-font-size) * 4);
		padding: calc(var(--pico-block-spacing-vertical) * 0.5)
			calc(var(--pico-block-spacing-horizontal) * 0.5);
		text-align: center;
	}
</style>
