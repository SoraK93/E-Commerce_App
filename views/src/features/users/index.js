import { changeUserPassword, getEmail, getUser, updateUser } from "./usersAPI";
import userReducer, { selectUser } from "./usersSlice";
import { User } from "./User";
import { UpdateUserInfo, ViewProfile, ChangePassword } from "./profile";
export const users = {
  component: { User, ViewProfile, UpdateUserInfo, ChangePassword },
  reducer: userReducer,
  select: selectUser,
  api: { getUser, updateUser, getEmail, changeUserPassword },
};

import { auth } from "./auth";
export { auth };
