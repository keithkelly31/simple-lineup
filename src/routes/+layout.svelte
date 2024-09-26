<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	// import '@fontsource-variable/nunito';
	import '$lib/styles/_normalize.css';
	import '$lib/styles/app.css';
	import { User } from '$stores/user.svelte';
	import { setupConvex } from 'convex-svelte';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	setupConvex(PUBLIC_CONVEX_URL);

	User.session = data.session;
	User.user = data.user;

	onMount(() => {
		const { data: _data } = data.supabase.auth.onAuthStateChange((event, newSession) => {
			if (newSession?.expires_at !== data.session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => _data.subscription.unsubscribe();
	});

	let unreadMessages = $state(false);
</script>

<header>
	<a class="brand" href="/">Simple Lineup</a>

	<nav class:session={data.session}>
		{#if data.session}
			<a href="/member">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="currentColor"
					><path
						d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"
					/></svg
				>
				<span>Teams</span>
			</a>

			<a href="/member/events">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="currentColor"
					><path
						d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"
					/></svg
				>
				<span>Events</span>
			</a>

			<a href="/member/messages">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="currentColor"
						><path
							d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"
						/></svg
					>
					{#if unreadMessages}
						<span class="notification-dot">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="12px"
								viewBox="0 -960 960 960"
								width="12px"
								fill="currentColor"
								><path
									d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
								/></svg
							>
						</span>
					{/if}
				</div>

				<span>Messages</span>
			</a>

			<a href="/member/settings">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="currentColor"
					><path
						d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"
					/></svg
				>
				<span>Settings</span>
			</a>

			<a href="/auth/signout">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="currentColor"
					><path
						d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
					/></svg
				>
				<span>Sign Out</span>
			</a>
		{:else}
			<a href="/auth/signin">Sign In</a>
			<a href="/auth/signup">Sign Up</a>
		{/if}
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>
	<span>© Simple Lineup. All rights reserved.</span>
</footer>

<style>
	footer,
	main {
		box-sizing: border-box;
		margin: auto;
		width: 100%;
		max-width: 800px;
		padding: 1rem;
	}

	footer,
	header {
		align-items: center;
		display: flex;
		gap: 1rem;
		justify-content: space-between;

		a {
			text-decoration: none;
		}
	}

	footer {
		padding-bottom: 6rem;
	}

	header {
		background-color: var(--text-color);
		box-sizing: border-box;
		left: 0;
		padding: 1rem;
		position: fixed;
		top: 0;
		width: 100vw;
	}

	main {
		flex: 1;
		padding-top: 4rem;
	}

	nav {
		align-items: center;
		display: flex;
		gap: 1rem;

		a {
			color: var(--muted-color);
		}
	}

	.brand {
		font-size: 1.25rem;
		font-weight: 500;
	}

	.notification-dot {
		color: var(--error);
		right: -4px;
		position: absolute;
		top: -3px;
	}

	.session {
		background-color: white;
		bottom: 0;
		border-top: 1px solid var(--secondary);
		box-sizing: border-box;
		gap: 0;
		left: 0;
		justify-content: space-between;
		position: fixed;
		width: 100vw;

		a {
			align-items: center;
			border-right: 1px solid var(--secondary);
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			padding: 1rem 0;
			position: relative;
			width: 100%;

			&:hover {
				color: var(--text-color);
				background-color: var(--secondary);
			}

			&:last-child {
				border-right: none;
			}

			div {
				display: flex;
				position: relative;
			}

			span {
				font-size: 0.75rem;
			}
		}
	}

	@media screen and (min-width: 640px) {
		footer {
			padding-bottom: 1rem;
		}

		.session {
			background-color: transparent;
			border: none;
			gap: 1rem;
			padding: 0;
			position: relative;
			width: auto;

			a {
				border: none;
				padding: 0;
				width: auto;

				&:hover {
					color: var(--secondary);
					background-color: transparent;
				}
			}
		}
	}
</style>
