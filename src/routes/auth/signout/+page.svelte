<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	onMount(async () => {
		await data.supabase.auth.signOut();
		goto('/');
	});
</script>

<h1>Signing Out...</h1>
