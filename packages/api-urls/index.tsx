const API_URLS = {
  createUser: '/create-user',
  createWish: '/create-wish',
  login: '/login',
  profile: '/profile',
  users: '/users',
  usersSearch: (search: string, pageNumber = 1) => `/users?search=${search}&pageNumber=${pageNumber}`,
};

export default Object.freeze(API_URLS);
