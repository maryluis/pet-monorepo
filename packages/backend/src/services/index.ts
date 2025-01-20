import {
  createUserService,
  getProfileService,
  loginService,
  getUsersByPartialSearch,
  getUserCommonInfo
} from './user-service';
import { assignedWish, createWish, cancelFromWish, getWishes } from './wish-service';
import { followUserService, unFollowUserService } from './follower-service';

export { assignedWish, createUserService, createWish,
  cancelFromWish, followUserService, getProfileService, loginService,
  getUsersByPartialSearch, getUserCommonInfo,
  unFollowUserService, getWishes
};
