import { IRutinaDataResponse } from "./IRutinaDataResponse";

export interface IListRutinaDataResponse{
  success: boolean,
  data:IRutinaDataResponse[],
  error: string
}
