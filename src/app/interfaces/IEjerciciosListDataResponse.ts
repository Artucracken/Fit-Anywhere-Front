import { IEjerciciosDataResponse } from "./IEjerciciosDataResponse";

export interface IEjerciciosListDataResponse{
  success: boolean,
  data: IEjerciciosDataResponse[],
  error: string
}
