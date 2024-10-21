<script lang="ts">
	import type { Tables } from '../../../database.types';

	interface Props {
		avatar: Tables<'profiles'>['avatar_url'] | Tables<'teams'>['avatar_url'];
		seed: Tables<'profiles'>['last_name'] | Tables<'teams'>['name'];
	}

	let { avatar, seed }: Props = $props();
</script>

<img src={avatar ?? `https://api.dicebear.com/9.x/initials/svg?seed=${seed}`} alt="" />

<style>
	img {
		border-radius: 9999px;
		height: 2.5rem;
		width: 2.5rem;
	}
</style>
