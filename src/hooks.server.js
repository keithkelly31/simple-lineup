import { MAILGUN_SECRET_KEY, STRIPE_SECRET_KEY, SUPABASE_SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import stripe from 'stripe';

const mailgun = new Mailgun(FormData);

/** @type { import("@sveltejs/kit").Handle } */
export const handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	event.locals.supabase_admin = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: SUPABASE_SERVICE_ROLE,
		event
	});

	event.locals.mail = mailgun.client({ username: 'api', key: MAILGUN_SECRET_KEY });

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
