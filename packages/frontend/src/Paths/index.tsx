export const Paths = {
  home: '/',
  login: '/login',
  profile: '/profile',
  registration: '/registration',
  user: '/user',
  userByNickname: (nickname: string) => `/user/${nickname}`,
};

export default Paths;
