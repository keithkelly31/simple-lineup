export function createAlert() {
	let message: string | null = $state(null);
	let type: 'error' | 'success' | null = $state(null);
	let visible: boolean = $state(false);

	$effect(() => {
		if (type !== null) {
			visible = true;
		}
	});

	$effect(() => {
		if (type === 'success') {
			setTimeout(() => (type = null), 5000);
		}
	});

	function setMessage(_message: string) {
		message = _message;
	}

	function setType(_type: 'error' | 'success' | null) {
		type = _type;
	}

	return {
		get message() {
			return message;
		},
		get type() {
			return type;
		},
		get visible() {
			return visible;
		},
		setMessage,
		setType
	};
}
