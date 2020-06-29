export function login({ username, password } : any) {
	if (username != 'admin') {
		return false;
	}
	if (password != 'admin') {
		return false;
	}

	localStorage.setItem("marni.username", username);
	return true;
}

export function isLoggedIn() {
	const username = localStorage.getItem("marni.username");
	return username != null;
}

export function logout() {
	localStorage.removeItem("marni.username");
}