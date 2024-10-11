<script lang="ts">
	import type { Doc } from '$convex/_generated/dataModel';
	import { Avatar } from '$lib/components';

	let { _id, avatar, name }: Doc<'teams'> = $props();
</script>

<article>
	<Avatar {avatar} seed={name} />
	<a href="/team/{_id}">{name}</a>
</article>

<style>
	article {
		align-items: center;
		display: flex;
		gap: var(--pico-spacing);
	}
</style>
