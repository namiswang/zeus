interface UserInfo {
  id: number;
  username: string;
}

export class LoginVo {
  userInfo: UserInfo;
  accessToken: string;
}
