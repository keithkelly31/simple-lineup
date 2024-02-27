// See https://kit.svelte.dev/docs/types#app

import type { Session, SupabaseClient } from '@supabase/supabase-js';

// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string;
			redirect?: string;
		}
		interface Locals {
			mail: any;
			supabase: SupabaseClient;
			supabase_admin: SupabaseClient;
			stripe: Stripe;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface PageState {}
		// interface Platform {}
		interface Team {
			id: string;
			name: string;
			stripe_customer: string;
			stripe_subscription: string;
		}
	}
}

export {};
