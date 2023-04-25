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

const getPrograms = async () => await _get('/api/programs');

async function setPost(data) {
  try {
    const resp = await fetch('/api/posts', {
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
    return false;
  }
}

async function loginUser(username, password) {
  try {
    const resp = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    console.log(resp)

    return resp.status == 200 ? await resp.json() : null;
  } catch (e) {
    console.error(e.message);
  }
}

export { getUsers, getPosts, getPrograms, setPost, setComment, createUser, loginUser }