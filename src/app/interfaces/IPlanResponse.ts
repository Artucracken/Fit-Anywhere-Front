import { IPlanDataResponse } from "./IPlanDataResponse";

export interface IPlanResponse{
succes:boolean,
data:IPlanDataResponse[],
error:string
}
