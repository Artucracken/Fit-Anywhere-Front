import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { IEjercicioRequest } from '../interfaces/IEjercicioRequest';
import { IEjerciciosDataResponse } from '../interfaces/IEjerciciosDataResponse';
import { IEjerciciosListDataResponse } from '../interfaces/IEjerciciosListDataResponse';

@Injectable({
  providedIn: 'root'
})
export class EjerciciosServiceService {

  apiUrl!: string;
  nuevoEjercicio!: IEjercicioRequest;
  succes: boolean = false;

  constructor(private http: HttpClient) {
    if (environment.production) {
      this.apiUrl = environment.apiUrl;
    } else {
      this.apiUrl = environment.apiUrl;
    }
  }

  addEjercicio(ejercicio: IEjercicioRequest): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/Ejercicio/Create`, ejercicio).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }),
      map((resp) => {
        console.log("resp desde el servicio: " + JSON.stringify(resp));
        return resp;
      })
    );
  }

  getEjercicios():Observable<IEjerciciosListDataResponse>{
    return this.http
      .post<IEjerciciosListDataResponse>(`${this.apiUrl}/Ejercicio/List`,0)
      .pipe(
        map((resp) => {
          console.log("list es: " + JSON.stringify(resp));
          return resp;
        })
      );
  }

  getEjercicio(id:number):Observable<IEjerciciosDataResponse>{
    console.log("el id desde el servicio es: " + id);
    return this.http.post<IEjerciciosDataResponse>(`${this.apiUrl}/Ejercicio/Detail?id=${id}`,{})
    .pipe(
      map((resp) => {
        console.log("el ejercicio es: " + JSON.stringify(resp));
        return resp;
      })
    );
  }
/*
 getEventos(): Observable<Evento[]> {
    return this.http.get<ResponseEventos>('/eventos').pipe(
      map(response => response.eventos),
      catchError((resp: HttpErrorResponse) => throwError(`Error obteniendo
      productos. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
    );
  }
*/

}
