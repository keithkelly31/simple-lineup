<script lang="ts">
	import type { Doc } from '$convex/_generated/dataModel';

	let { subject }: Doc<'messages'> = $props();
</script>

<article>{subject}</article>
