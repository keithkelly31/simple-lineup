<script>
	import { page } from '$app/stores';
</script>

<article>
	<h1>An Error Occurred</h1>

	<pre>{$page.error?.message}</pre>

	{#if $page.error?.details}
		<pre>Code: {$page.form.details.code}</pre>
		<pre>Details: {$page.form.details.message}</pre>
	{/if}

	<a href={$page.error?.redirect || '/'}>
		{$page.error?.redirect ? 'Go back' : 'Head home'}
	</a>
</article>

<style>
	pre {
		font-family: var(--pico-font-family);
		white-space: pre-wrap;
	}
</style>
