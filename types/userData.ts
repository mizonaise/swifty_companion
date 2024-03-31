export interface IImage {
  link?: string;
}

export interface IUser {
  id?: number;
  image?: IImage;
}

export interface IUserRes {
  id?: number;
  data?: IUser;
}

