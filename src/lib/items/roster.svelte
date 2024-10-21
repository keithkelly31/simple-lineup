<script lang="ts">
	import { Avatar } from '$lib/components';
	import type { Tables } from '../../../database.types';

	interface Props {
		member: Tables<'profiles'>;
	}

	let { member }: Props = $props();
</script>

<article>
	<div>
		<Avatar avatar={member.avatar_url} seed={member.last_name} />
		<span>{member.first_name} {member.last_name}</span>
	</div>
</article>

<style>
	div {
		align-items: center;
		display: flex;
		gap: var(--pico-spacing);
	}
</style>
