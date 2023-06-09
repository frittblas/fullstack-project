import { useLocalStorage } from './useLocalStorage';
import { useNavigate } from 'react-router-dom';

export const useApi = () => {
  const [user, setUser] = useLocalStorage('user', []);
  const navigate = useNavigate();

  const resetUserLogin = () => setUser(null);

  return {
    async getUsers() { return await this._get('/api/users') },

    async getPost(id) { return await this._get('/api/posts/' + id) },

    async getPosts(all) { return await this._get('/api/posts?all=' + Number(all)) },

    async getPrograms() { return await this._get('/api/programs') },

    async getAboutData() { return await this._get('/api/about') },

    async getNumberOfUsers() { return await this._get('/api/admin/statistics/users') },

    async getUsersPerProgram() { return await this._get('/api/admin/statistics/users/program') },

    async getNumberOfPosts() { return await this._get('/api/admin/statistics/posts') },

    async getPostsPerProgram() { return await this._get('/api/admin/statistics/posts/program') },

    async setPost(data, all) { return await this._post('/api/posts?all=' + Number(all), data) },

    async setComment(postId, data) { return this._put(`/api/posts/${postId}/reply`, data) },

    async createUser(data) { return await this._post('/api/users/register', data) },

    async loginUser(username, password) { return await this._post('/api/users/login', { username, password }) },

    async logoutUser() { return await this._post('/api/users/logout', {}) },

    async deleteUser(username) { return await this._delete(`/api/admin/users/${username}`) },

    async updateUser(username, updatedUser) { return await this._put(`/api/admin/users/${username}`, updatedUser) },

    async _get(url) {
      try {
        const resp = await fetch(url);
        if (resp.status == 401) {resetUserLogin(); navigate('/login')}
        else if (resp.status == 403) navigate('/unauth');
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

        if (resp.status == 401) {resetUserLogin(); navigate('/login')};

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

        if (resp.status == 401) {resetUserLogin(); navigate('/login')};

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

        if (resp.status == 401) {resetUserLogin(); navigate('/login')};
        
        return resp.ok ? await resp.json() : null;
      } catch (e) {
        console.error(e.message);
      }
    },
  }
}