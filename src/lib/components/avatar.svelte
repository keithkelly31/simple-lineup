<script lang="ts">
	let { avatar, seed }: { avatar: string | null | undefined; seed: string } = $props();
</script>

<img src={avatar ?? `https://api.dicebear.com/9.x/initials/svg?seed=${seed}`} alt="" />

<style>
	img {
		border-radius: 9999px;
		height: 2.5rem;
		width: 2.5rem;
	}
</style>
