<script lang="ts">
	import { slide } from 'svelte/transition';
	import Icon from './icon.svelte';

	let { alert }: { alert: any } = $props();
</script>

{#if alert.type !== null}
	<article
		class:error={alert.type === 'error'}
		class:success={alert.type === 'success'}
		transition:slide
	>
		<div class="container">
			<div>{alert.message}</div>
			{#if alert.type === 'error'}
				<Icon icon="close" pointer onclick={() => alert.setType(null)} />
			{/if}
		</div>
	</article>
{/if}

<style>
	article {
		border-radius: 0;
		color: #fff;
		left: 0;
		position: fixed;
		top: 0;
		width: 100vw;
		z-index: 1000;

		.container {
			align-items: flex-start;
			display: flex;
			justify-content: space-between;
		}
	}

	.error {
		background-color: var(--error);
	}

	.success {
		background-color: var(--success);
	}
</style>
