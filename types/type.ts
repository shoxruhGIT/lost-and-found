export interface IItems {
  Id: string;
  userId: string | null;
  name: string;
  location: string;
  date: string;
  type: string;
  status: string;
  image: string;
}

export interface IUser {
  username: string;
  email: string;
  password?: string;
}
