const url = 'http://localhost:3030/jsonstore/users';

export const getAllUsers = async () => {
  try {
    const response = await fetch(url);
    const result = await response.json();

    const data = Object.values(result);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (user) => {
  try {
    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: user.imageUrl,
      address: {
        country: user.country,
        city: user.city,
        street: user.street,
        streetNumber: user.streetNumber,
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    const data = Object.values(result);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getOneUser = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`);

    const result = await response.json();

    const data = result;

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const editUser = async (user, id) => {
  try {
    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: user.imageUrl,
      address: {
        country: user.country,
        city: user.city,
        street: user.street,
        streetNumber: user.streetNumber,
      },
      _id: id,
    };

    const response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    const data = result;

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });

    const result = response.json();
    const data = result;

    return data;
  } catch (err) {
    console.log(err);
  }
};
