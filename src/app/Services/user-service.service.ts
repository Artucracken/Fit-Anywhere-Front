import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { ILogin } from '../interfaces/ILogin';
import { ILoginDataResponse } from '../interfaces/ILoginDataResponse';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import { IRegister } from '../interfaces/IRegister';
import { IResponse } from '../interfaces/IResponse';
import { IUserEdit } from '../interfaces/IUserEdit';
import { IUserListResponse } from '../interfaces/IUserListResponse';
import {IUserResponse} from '../interfaces/IUserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  apiUrl!: string;
  newUser!: IRegister;
  succes: boolean = false;
  constructor(private http: HttpClient) {
    if (environment.production) {
      this.apiUrl = environment.apiUrl;
    } else {
      this.apiUrl = environment.apiUrl;
    }
  }
  // Get user token from server
  getToken(userLogin: ILogin): Observable<ILoginDataResponse> {
    return this.http.post<ILoginDataResponse>(`${this.apiUrl}/Auth/Login`, userLogin)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        }),
        map((resp) => {
          console.log("resp desde el servicio: " + JSON.stringify(resp.data));
          return resp;
        })
      );
  }
  getUser(id: number /*,typeToken: string,token: string*/): Observable<IUserListResponse> {
    console.log("el id es: " + id);
    const requestData = { id: id };
    return this.http
      .post<IUserListResponse>(`${this.apiUrl}/User/List`,requestData)
      .pipe(
        map((resp) => {
          console.log("list es: " + JSON.stringify(resp));
          return resp;
        })
      );
  }

  //Creamos un nuevo usuario para al hacer el registro
  createUser(newUser:IRegister): Observable<IResponse>{
    return this.http.post<IResponse>(`${this.apiUrl}/User/Create`, newUser).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }),
      map((resp) => {
        console.log("resp desde el servicio: " + JSON.stringify(resp));
        return resp;
      })
    );
  }
  //Editar el usuario
  editUser(userEdit:IUserEdit): Observable<IResponse>{
    return this.http.post<IResponse>(`${this.apiUrl}/User/Edit`, userEdit).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }),
      map((resp) => {
        console.log("resp desde el servicio: " + JSON.stringify(resp));
        return resp;
      })
    );
  }
  //OBTENCION DEL TOKEN DEL USUARIO
  devuelveToken(userLogin: ILogin): Observable<string> {
    const options = {
      responseType: 'text' as 'json' // Utiliza 'text' para recibir texto sin procesar
    };
    return this.http.post<string>(`${this.apiUrl}/auth/Login`, userLogin, options).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
