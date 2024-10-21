<script lang="ts">
	import type { Tables } from '../../../database.types';

	interface Props {
		event: Tables<'events'>;
	}

	let { event }: Props = $props();
</script>

<article>{event.description}</article>
