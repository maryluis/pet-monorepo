export interface IUser {
  id: string,
  nickName: string,
  hashedPassword: string,
  tasks: ITask[],
}

export interface IUserRegistration {
  confirmPassword: string,
  nickName: string,
  password: string,
}

export interface ITask {
  description: string,
  id: string,
  isDone: boolean,
  title: string,
}
