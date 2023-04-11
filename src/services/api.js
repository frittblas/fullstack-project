async function getUsers() {
	try {
		const resp = await fetch('/api/users');
		return resp.ok ? await resp.json() : null;
	} catch (e) {
		console.error(e.message);
	}
}

async function getPosts() {
	try {
		const resp = await fetch('/api/posts');
		return resp.ok ? await resp.json() : null;
	} catch (e) {
		console.error(e.message);
	}
}

async function setPost(data) {
	try {
		const resp = await fetch('/api/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		return resp.status == 200 ? await resp.json() : null;
	} catch (e) {
		console.error(e.message);
	}
}

export { getUsers, getPosts, setPost }