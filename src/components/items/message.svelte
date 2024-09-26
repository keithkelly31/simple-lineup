<script lang="ts">
	import type { Doc } from '$convex/_generated/dataModel';

	let message: Doc<'messages'> = $props();
</script>

<article>{message.text}</article>
