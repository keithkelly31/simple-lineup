<script>
	import Signup from '$lib/forms/signup.svelte';

	/** @type { import("./$types").PageData } */
	export let data;
	let { price } = data;
</script>

<section>
	<hgroup>
		<h1>Simple Lineup</h1>
		<h2>A simple, straightforward web app for managing your beer league team.</h2>
	</hgroup>

	<p>
		My name is Keith, and I am the developer of Simple Lineup. I have been managing a beer league
		hockey team in my hometown of Pittsburgh for about a decade. Managing a team can be difficult.
		Over the years, I have tried several methods and apps to help me manage the team, but I was
		looking for something else.
	</p>

	<p>
		We all know what it is like to tally game attendance through email or a group chat. It's brutal.
		The apps and websites I tried were just too much, trying to be everything to everyone. I am not
		looking to track the advanced statistics of our team of forty-year-olds playing beer league
		hockey at 11 pm on a Wednesday. Nor do I need to assign beer duty. We are all adults and can
		supply our beer.
	</p>

	<p>What I need are three things:</p>
	<ol>
		<li>I need to know who is coming to the next game</li>
		<li>I need to be able to quickly and easily communicate changes and updates to the team</li>
		<li>I need to track who completed their tasks like signing the waiver or paying their dues</li>
	</ol>

	<p>
		Anything beyond those three core items is fluff. I didn't want the fluff, so I created Simple
		Lineup.
	</p>

	<p>
		I worked hard to build an application that focuses on those key points and presents them in the
		most straightforward interface.
	</p>

	<p>
		Please give it a try. You can create a member account for <strong>FREE</strong>. Create a team
		and try it free for seven days; after that, it is only <strong>${price}</strong> monthly.
	</p>

	<p>
		If you have any questions or comments, please feel free to <a href="/contact"
			>send me a message</a
		>.
	</p>
</section>

<section>
	<h3>Join today!</h3>

	<article class="signup">
		<Signup />
	</article>
</section>
