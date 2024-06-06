<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	$effect(() => {
		$page.data.supabase
			.channel('team')
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'teams',
					filter: `id=eq.${$page.params.uid}`
				},
				(/** @type {any} */ payload) => {
					if (payload.new.active) goto(`/teams/${$page.params.uid}`);
				}
			)
			.subscribe();
	});
</script>

<!-- <PageBusy label="activating team" /> -->
