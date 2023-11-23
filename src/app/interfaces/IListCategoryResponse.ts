import { IIdValor } from "./IIdValor";

export interface IListCategoryResponse{
  succes: boolean;
  categorias: IIdValor[];
  error: string;
}
