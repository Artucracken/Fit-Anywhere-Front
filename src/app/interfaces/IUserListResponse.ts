import { IUserResponse } from "./IUserResponse";

export interface IUserListResponse{
  success: boolean,
  userList:IUserResponse[],//añado [] para hacerlo array
  error:string
}
