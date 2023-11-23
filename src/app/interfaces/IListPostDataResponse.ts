import { IPostDataResponse } from "./IPostDataResponse";

export interface IListPostDataResponse{
  seccess: boolean,
  data: IPostDataResponse[],
  error: string
}
