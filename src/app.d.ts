// src/app.d.ts

import { Session, SupabaseClient } from '@supabase/supabase-js';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient
      supabaseAdmin: SupabaseClient
      safeGetSession(): Promise<{ session: Session | null; user: User | null }>
      stripe: Stripe
    }
    interface PageData {
      session: Session | null
      user: User | null
    }
    // interface Error {}
    // interface Platform {}
  }
}