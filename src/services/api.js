async function getUsers() {
  try {
    const resp = await fetch('/api/users');
    return resp.ok ? await resp.json() : null;
  } catch (e) {
    console.error(e.message);
  }
}

async function getAllUsers() {
  try {
    const resp = await fetch('/api/admin/users');
    return resp.ok ? await resp.json() : null;
  } catch (e) {
    console.error(e.message);
  }
}

async function createNewUser(data) {
  try {
    const resp = await fetch('/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return resp.status == 200 ? await resp.json() : null;
  } catch (e) {
    console.error(e);
    return e.message;
  }
}


async function deleteUser(username) {
  console.log(`button clicked ${username}`);
  try {
    const resp = await fetch(`/api/admin/users/${username}`, {
      method: 'DELETE'
    });
    console.log(`Server responded with ${JSON.stringify(resp)}`);
    return resp.ok ? await resp.json() : null;
  } catch (e) {
    console.error(e.message);
  }
}

async function getPost(id) {
  try {
    const resp = await fetch('/api/posts/' + id);
    return resp.ok ? await resp.json() : null;
  } catch (e) {
    console.error(e.message);
  }
}

async function getPosts(all) {
  try {
    const resp = await fetch('/api/posts?all=' + Number(all));
    return resp.ok ? await resp.json() : null;
  } catch (e) {
    console.error(e.message);
  }
}

const getPrograms = async () => await _get('/api/programs');

const getAboutData = async () => await _get('/api/about');

async function setPost(data, all) {
  try {
    const resp = await fetch('/api/posts?all=' + Number(all), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return resp.status == 201 ? await resp.json() : null;
  } catch (e) {
    console.error(e.message);
  }
}


async function setComment(postId, data) {
  try {
    const resp = await fetch(`/api/posts/${postId}/reply`, {
      method: 'PUT',
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

// generic getter
async function _get(url) {
  try {
    const resp = await fetch(url);
    return resp.ok ? await resp.json() : null;
  } catch (e) {
    console.error(e.message);
  }
}

async function createUser(data) {
  try {
    const resp = await fetch(`/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return resp.status == 200 ? await resp.json() : null;
  } catch (e) {
    console.error(e.message);
    return e.message;
  }
}

async function loginUser(username, password) {
  try {
    const resp = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    return resp.status == 200 ? await resp.json() : null;
  } catch (e) {
    console.error(e.message);
    return e.message;
  }
}

async function logoutUser() {
  try {
    const resp = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    return resp.status == 200 ? await resp.json() : null;
  } catch (e) {
    console.error(e.message);
    return e.message;
  }
}

export { getUsers, getPost, getPosts, getPrograms, getAboutData, setPost, setComment, createUser, loginUser, deleteUser, getAllUsers ,logoutUser, createNewUser}