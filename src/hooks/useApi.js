import { useNavigate } from 'react-router-dom';

export const useApi = () => {
	const navigate = useNavigate();

	return {
		async getUsers() {return await this._get('/api/users')},

		async getAllUsers() {
			console.error("delete me and use getUsers()");
		  // try {
		  //   const resp = await fetch('/api/admin/users');
		  //   if (resp.status == 401) navigate('/login');
		  //   return resp.ok ? await resp.json() : null;
		  // } catch (e) {
		  //   console.error(e.message);
		  // }
		},

		async createNewUser(data) {
			console.error("delete me and use createUser()");
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

		async setPost(data, all) {return await this._post('/api/posts?all=' + Number(all), data)},

		async setComment(postId, data) {return this._put(`/api/posts/${postId}/reply`, data)},

		async createUser(data) {return await this._post('/api/users/register', data)},
		
		async loginUser(username, password) {return await this._post('/api/users/login', {username, password})},
		
		async logoutUser() {return await this._post('/api/users/logout', {})},

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

		    return (resp.status == 200 || resp.status == 201) ? await resp.json() : null;
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

		    return (resp.status == 200 || resp.status == 201) ? await resp.json() : null;
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