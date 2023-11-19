import * as userService from '../services/userService.js';

export const searchByCriteria = async (searchValue, criteria) => {
  let users = await userService.getAllUsers();

  if (criteria === 'notSelected') {
    users = users.filter((user) =>
      user.firstName.toLowerCase().includes(searchValue.toLowerCase())
    );
  } else {
    users = users.filter((user) =>
      user[criteria].toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  return users;
};
