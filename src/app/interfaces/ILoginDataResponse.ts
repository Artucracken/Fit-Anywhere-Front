import { Timestamp } from "rxjs";
import { ILoginResponse } from "./ILoginResponse";

export interface ILoginDataResponse{
  data: ILoginResponse,
  dateLogin: Date,
  dateLoginExpires: Date,
  token: string
}
