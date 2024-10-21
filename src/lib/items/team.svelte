<script lang="ts">
	import { Avatar } from '$lib/components';
	import type { Tables } from '../../../database.types';

	interface Props {
		team: Tables<'teams'>;
	}

	let { team }: Props = $props();
</script>

<article>
	<Avatar avatar={team.avatar_url} seed={team.name} />
	<a href="/team/{team.id}">{team.name}</a>
</article>

<style>
	article {
		align-items: center;
		display: flex;
		gap: var(--pico-spacing);
	}
</style>
