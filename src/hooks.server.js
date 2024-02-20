import { SENDGRID_SECRET_KEY, STRIPE_SECRET_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import mail from '@sendgrid/mail';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import stripe from 'stripe';

/** @type { import("@sveltejs/kit").Handle } */
export const handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	event.locals.mail = mail.setApiKey(SENDGRID_SECRET_KEY);

	event.locals.stripe = new stripe(STRIPE_SECRET_KEY);

	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
