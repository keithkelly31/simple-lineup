<script lang="ts">
	import type { Doc } from '$convex/_generated/dataModel';

	let { description }: Doc<'events'> = $props();
</script>

<article>{description}</article>
