import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IIdValor } from '../interfaces/IIdValor';
import { IListCategoryResponse } from '../interfaces/IListCategoryResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoriaServiceService {
  apiUrl!: string;
  //categorias!: IEjercicioRequest;
  succes: boolean = false;
idvalor: IIdValor={id:0, valor:""}
  constructor(private http: HttpClient) {
    if (environment.production) {
      this.apiUrl = environment.apiUrl;
    } else {
      this.apiUrl = environment.apiUrl;
    }
  }

  getCategorias():Observable<IListCategoryResponse>{
    return this.http
      .post<IListCategoryResponse>(`${this.apiUrl}/Category/List`,this.idvalor)
      .pipe(
        map((resp) => {
          console.log("list es: " + JSON.stringify(resp));
          return resp;
        })
      );
  }
}
