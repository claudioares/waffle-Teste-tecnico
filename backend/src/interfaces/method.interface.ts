import { IOpeningWebhook, IResponseOpennewsletter, IUserLogin, UserResponse } from "./interfaces";

export interface IMethodsOpeningsValues {
  login({ email }:IUserLogin):Promise<UserResponse | { error: string }>;
  create(data:IOpeningWebhook):Promise<IResponseOpennewsletter>;
  verifyUser(email: string):Promise<boolean>;
}