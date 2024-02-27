<script>
	/** @type {import('./$types').PageData} */
	export let data;
	let { message } = data;
	$: ({ message } = data);
</script>

<h3>{message.subject}</h3>
<pre>{message.text}</pre>
