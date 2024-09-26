<script lang="ts">
	import type { Doc } from '$convex/_generated/dataModel';

	let event: Doc<'events'> = $props();
</script>

<article>{event.description}</article>
