import type { Session, User as UserType } from '@supabase/supabase-js';

function user() {
	let session: Session | null = $state(null);
	let user: UserType | null = $state(null);

	return {
		get session() {
			return session;
		},

		get user() {
			return user;
		},

		set session(_session) {
			session = _session;
		},

		set user(_user) {
			user = _user;
		}
	};
}

export const User = user();
