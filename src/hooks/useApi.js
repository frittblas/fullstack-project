import { useNavigate } from 'react-router-dom';

export const useApi = () => {
	const navigate = useNavigate();

	return {
		async getUsers() {return await this._get('/api/users')},

		async getAllUsers() {
			console.error("delete me");
		  // try {
		  //   const resp = await fetch('/api/admin/users');
		  //   if (resp.status == 401) navigate('/login');
		  //   return resp.ok ? await resp.json() : null;
		  // } catch (e) {
		  //   console.error(e.message);
		  // }
		},

		async createNewUser(data) {
			console.error("delete me");
		  // try {
		  //   const resp = await fetch('/api/admin/users', {
		  //     method: 'POST',
		  //     headers: {
		  //       'Content-Type': 'application/json'
		  //     },
		  //     body: JSON.stringify(data)
		  //   });

		  //   if (resp.status == 401) navigate('/login');

		  //   return resp.status == 200 ? await resp.json() : null;
		  // } catch (e) {
		  //   console.error(e);
		  //   return e.message;
		  // }
		},

		async getPost(id) {return await this._get('/api/posts/' + id)},

		async getPosts(all) {return await this._get('/api/posts?all=' + Number(all))},

		async getPrograms() {return await this._get('/api/programs')},

		async getAboutData() {return await this._get('/api/about')},

		// async function setPost(data, all) {
		//   try {
		//     const resp = await fetch('/api/posts?all=' + Number(all), {
		//       method: 'POST',
		//       headers: {
		//         'Content-Type': 'application/json'
		//       },
		//       body: JSON.stringify(data)
		//     });

		//     return resp.status == 201 ? await resp.json() : null;
		//   } catch (e) {
		//     console.error(e.message);
		//   }
		// }

		async setComment(postId, data) {return this._put(`/api/posts/${postId}/reply`, data)},

		// async function createUser(data) {
		//   try {
		//     const resp = await fetch(`/api/users/register`, {
		//       method: 'POST',
		//       headers: {
		//         'Content-Type': 'application/json'
		//       },
		//       body: JSON.stringify(data)
		//     });

		//     return resp.status == 200 ? await resp.json() : null;
		//   } catch (e) {
		//     console.error(e.message);
		//     return e.message;
		//   }
		// }

		// async function loginUser(username, password) {
		//   try {
		//     const resp = await fetch('/api/users/login', {
		//       method: 'POST',
		//       headers: { 'Content-Type': 'application/json' },
		//       body: JSON.stringify({ username, password })
		//     });

		//     return resp.status == 200 ? await resp.json() : null;
		//   } catch (e) {
		//     console.error(e.message);
		//     return e.message;
		//   }
		// }

		// async function logoutUser() {
		//   try {
		//     const resp = await fetch('/api/users/logout', {
		//       method: 'POST',
		//       headers: { 'Content-Type': 'application/json' }
		//     });

		//     return resp.status == 200 ? await resp.json() : null;
		//   } catch (e) {
		//     console.error(e.message);
		//     return e.message;
		//   }
		// }

		async deleteUser(username) {return await this._delete(`/api/admin/users/${username}`)},

		async _get(url) {
		  try {
		    const resp = await fetch(url);
		    if (resp.status == 401) navigate('/login');
		    return resp.ok ? await resp.json() : null;
		  } catch (e) {
		    console.error(e.message);
		  }
		},

		async _post(url, bodyObj) {
		  try {
		    const resp = await fetch(url, {
		      method: 'POST',
		      headers: { 'Content-Type': 'application/json' },
		      body: JSON.stringify(bodyObj)
		    });

		    if (resp.status == 401) navigate('/login');

		    return resp.status == 200 ? await resp.json() : null;
		  } catch (e) {
		    console.error(e.message);
		    return e.message;
		  }
		},

		async _put(url, bodyObj) {
		  try {
		    const resp = await fetch(url, {
		      method: 'PUT',
		      headers: { 'Content-Type': 'application/json' },
		      body: JSON.stringify(bodyObj)
		    });

		    if (resp.status == 401) navigate('/login');

		    return resp.status == 200 ? await resp.json() : null;
		  } catch (e) {
		    console.error(e.message);
		    return e.message;
		  }
		},

		async _delete(url) {
		  try {
		    const resp = await fetch(url, {
		      method: 'DELETE'
		    });

		    return resp.ok ? await resp.json() : null;
		  } catch (e) {
		    console.error(e.message);
		  }
		},
	}
}