export const Paths = {
  home: '/',
  login: '/login',
  loginWithFallback: (fallback:string) => `/login?fallback=${fallback}`,
  profile: '/profile',
  registration: '/registration',
  user: '/user',
  userByNickname: (nickname: string) => `/user/${nickname}`,
};

export default Paths;
