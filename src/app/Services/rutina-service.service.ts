import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';
import { IListRutinaDataResponse } from '../interfaces/IListRutinaDataResponse';
import { IResponse } from '../interfaces/IResponse';
import { IRutinaRequest } from '../interfaces/IRutinaRequest';

@Injectable({
  providedIn: 'root'
})
export class RutinaServiceService {

  apiUrl!: string;
  //nuevoEjercicio!: IEjercicioRequest;
  succes: boolean = false;

  constructor(private http: HttpClient) {
    if (environment.production) {
      this.apiUrl = environment.apiUrl;
    } else {
      this.apiUrl = environment.apiUrl;
    }
  }

  getRutinas():Observable<IListRutinaDataResponse>{
    return this.http
      .post<IListRutinaDataResponse>(`${this.apiUrl}/Rutina/List`,{})
      .pipe(
        map((resp) => {
          console.log("list es: " + JSON.stringify(resp));
          return resp;
        })
      );
  }
  createRutina(nuevaRutina: IRutinaRequest):Observable<IResponse>{
    return this.http.post<IResponse>(`${this.apiUrl}/Rutina/Create`,nuevaRutina)
    .pipe(
      map((resp) => {
        console.log("resp es: " + JSON.stringify(resp));
        return resp;
      })
    );
  }

  deleteRutina(id:number):Observable<IResponse>{
    console.log("el id dentro del repositorio es: " + id);
    return this.http.post<IResponse>(`${this.apiUrl}/Rutina/Delete`,id)
    .pipe(
      map((resp) => {
        console.log("resp es: " + JSON.stringify(resp));
        window.location.reload();
        return resp;
      })
    );
  }
}
