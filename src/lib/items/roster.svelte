<script lang="ts">
	import type { Doc } from '$convex/_generated/dataModel';
	import { Avatar } from '$lib/components';

	let { avatar, firstName, lastName }: Doc<'users'> = $props();
</script>

<article>
	<div>
		<Avatar {avatar} seed={lastName} />
		<span>{firstName} {lastName}</span>
	</div>
</article>

<style>
	div {
		align-items: center;
		display: flex;
		gap: var(--pico-spacing);
	}
</style>
