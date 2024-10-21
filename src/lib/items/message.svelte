<script lang="ts">
	import type { Tables } from '../../../database.types';

	interface Props {
		message: Tables<'messages'>;
	}

	let { message }: Props = $props();
</script>

<article>{message.subject}</article>
