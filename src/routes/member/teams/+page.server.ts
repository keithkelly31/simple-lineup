// import { Stripe } from '$stores/stripe.svelte';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return redirect(302, "/member/teams/list");
};