const authUrls = {
  authCheck: '/auth/check',
  createUser: '/auth/create',
  login: '/auth/login',
};

const followersUrls = {
  followers: '/followers',
};

const usersUrls = {
  profile: '/users/profile',
  users: '/users',
  usersSearch: (search: string, pageNumber: string) => `/users?search=${search}&pageNumber=${pageNumber}`,
  userByNickname: (nickname: string) => `/users/${nickname}`,
};

const wishesUrls = {
  assignWish: '/wishes/assign',
  cancelAssignWish: '/wishes/cancel',
  createWish: '/wishes',
  wishes: '/wishes',
  wishesList: (authorId: string, pageNumber = 1, executorId = '') => {
    const executorIdQuery = executorId ? `&executorId=${executorId}` : '';
    const pageNumberQuery = pageNumber ? `&pageNumber=${pageNumber}` : '&pageNumber=1';
    return `/wishes?authorId=${authorId}${executorIdQuery}${pageNumberQuery}`;
  }
};

const API_URLS = {
  ...authUrls,
  ...followersUrls,
  ...usersUrls,
  ...wishesUrls,
};

export default Object.freeze(API_URLS);
