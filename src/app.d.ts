import type { Session, SupabaseClient } from '@supabase/supabase-js';
import type { ConvexHttpClient } from 'convex/browser';

declare global {
	namespace App {
		interface Locals {
			convex: ConvexHttpClient;
			supabase: SupabaseClient;
			supabaseAdmin: SupabaseClient;
			safeGetSession(): Promise<{
				session: Session | null;
				user: User | null;
			}>;
			stripe: Stripe;
		}
		interface PageData {
			session: Session | null;
			user: User | null;
		}
		interface Error {
			data?: any;
			message: string;
		}
		// interface Platform {}
	}
}
