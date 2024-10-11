<script lang="ts">
	import { Form, InputGroup } from '$lib/components';
</script>

<h1>Sign Up</h1>

<Form label="Sign Up">
	<InputGroup
		label="Email"
		name="email"
		placeholder="Please enter your email address"
		type="email"
		required
	/>

	<InputGroup
		label="Password"
		name="password"
		placeholder="Please enter your password"
		type="password"
		required
	/>

	<div class="grid">
		<InputGroup
			label="First Name"
			name="firstName"
			placeholder="Please enter your first name"
			required
		/>

		<InputGroup
			label="Last Name"
			name="lastName"
			placeholder="Please enter your last name"
			required
		/>
	</div>
</Form>
