export interface IUser {
  id: string,
  nickname: string,
  token: string,
}

export interface IRegisteredUser {
  id: string,
  nickname: string,
  hashedPassword: string,
}

export interface IUserRegistration {
  confirmPassword: string,
  nickname: string,
  password: string,
}

export interface IUserLogin {
  nickname: string;
  password: string;
}

export interface IWish {
  id: string;
  title: string;
  description?: string;
  authorId: string;
  executorId?: string;
  createdAt: Date;
  updatedAt: Date;
  assigned: boolean;
  is_received: boolean;
}

export interface IWishCreateData {
  authorId: string,
  title: string,
  description?: string,
}
