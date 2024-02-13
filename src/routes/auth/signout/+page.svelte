<script>
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';

	/** @type { import("./$types").PageParentData } */
	export let data;
	const { supabase } = data;

	onMount(() => {
		supabase.auth.signOut();
		invalidateAll();
	});
</script>

<article aria-busy="true">Signing Out</article>

<style>
	article {
		text-align: center;
	}
</style>
