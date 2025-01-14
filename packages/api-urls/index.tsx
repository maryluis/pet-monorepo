const API_URLS = {
  authCheck: '/auth/check',
  createUser: '/auth/create',
  createWish: '/wishes',
  followers: '/followers',
  login: '/auth/login',
  profile: '/users/profile',
  users: '/users',
  usersSearch: (search: string, pageNumber = 1) => `/users?search=${search}&pageNumber=${pageNumber}`,
  userByNickname: (nickname: string) => `/users/${nickname}`,
};

export default Object.freeze(API_URLS);
