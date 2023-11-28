const urls = {
  loginUrl: 'http://localhost:3030/users/login',
  registerUrl: 'http://localhost:3030/users/register',
  logoutUrl: 'http://localhost:3030/users/logout',
  userDetails: 'http://localhost:3030/users/me',
};

export const login = async (email, password) => {
  const userSample = {
    email: email,
    password: password,
  };

  const res = await fetch(urls.loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userSample),
  });

  const token = await res.json();

  if (res.status !== 200) {
    throw new Error(token.message);
  }
  return token;
};

export const logout = async (authToken) => {
  let isSuccessful = false;
  const res = await fetch(urls.logoutUrl, {
    method: 'GET',
    headers: {
      'X-Authorization': authToken.accessToken,
    },
  });

  if (res.status !== 204) {
    return isSuccessful;
  }

  isSuccessful = true;
  return isSuccessful;
};

export const register = async (email, password) => {
  const userSample = {
    email: email,
    password: password,
  };

  const res = await fetch(urls.registerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userSample),
  });

  const token = await res.json();

  if (res.status === 409) {
    return {
      alreadyExists: true,
    };
  }
  if (res.status !== 200) {
    throw new Error(token.message);
  }
  return token;
};
