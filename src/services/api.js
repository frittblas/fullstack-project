async function getUsers() {
  try {
    const resp = await fetch('/api/users');
    return resp.ok ? await resp.json() : null;
  } catch (e) {
    console.error(e.message);
  }
}
async function deleteUser(username) {
  try {
    const resp = await fetch('/api/admin/users/' + username, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return resp.ok ? await resp.json() : null;
  } catch (e) {
    console.error(e.message);
  }
}


async function getProgramPosts() {
  try {
    const resp = await fetch('/api/posts/program');
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

const getPrograms = async () => await _get('/api/programs');

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
    return [false, e.message];
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
  }
}

export { getUsers, getPosts, getPrograms, getProgramPosts, setPost, setComment, createUser, loginUser, deleteUser }