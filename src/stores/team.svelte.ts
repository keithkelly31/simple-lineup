
function team() {
	let isAdmin = false;

	return {
		get isAdmin() {
			return isAdmin;
		},

    set isAdmin(value: boolean) {
      isAdmin = value;
    },

    reset() {
      isAdmin = false;
    }
  }
}

export const Team = team();
