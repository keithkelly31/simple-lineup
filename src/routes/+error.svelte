<script>
	import { page } from '$app/stores';
</script>

<article>
	<h1>An Error Occurred</h1>
	<p>{$page.error?.message}</p>
	<a href={$page.error?.redirect || '/'}>
		{$page.error?.redirect ? 'Go back' : 'Head home'}
	</a>
</article>
