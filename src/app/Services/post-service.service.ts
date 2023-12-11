import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';
import { IListPostDataResponse } from '../interfaces/IListPostDataResponse';
import { IPostDataResponse } from '../interfaces/IPostDataResponse';
import { IPostRequest } from '../interfaces/IPostRequest';
import { IResponse } from '../interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  apiUrl!: string;
  succes: boolean = false;

  constructor(private http: HttpClient) {
    if (environment.production) {
      this.apiUrl = environment.apiUrl;
    } else {
      this.apiUrl = environment.apiUrl;
    }
  }

  getPosts():Observable<IListPostDataResponse>{
    return this.http
      .post<IListPostDataResponse>(`${this.apiUrl}/Post/List`,{})
      .pipe(
        map((resp) => {
          console.log("list es: " + JSON.stringify(resp));
          return resp;
        })
      );
  }
  getPost(id:number):Observable<IPostDataResponse>{
    console.log("el id desde el servicio es: " + id);
    return this.http.post<IPostDataResponse>(`${this.apiUrl}/Post/Detail?id=${id}`,{})
    .pipe(
      map((resp) => {
        console.log("el post es: " + JSON.stringify(resp));
        return resp;
      })
    );
  }

  createPost(newPost: IPostRequest):Observable<IResponse>{
    return this.http.post<IResponse>(`${this.apiUrl}/Post/Create`,newPost)
    .pipe(
      map((resp) => {
        console.log("Respuesta: " + JSON.stringify(resp));
        return resp;
      })
    );
  }
  deletePost(id:number):Observable<IResponse>{
    console.log("el id dentro del repositorio es: " + id);
    return this.http.post<IResponse>(`${this.apiUrl}/Post/Delete`,id)
    .pipe(
      map((resp) => {
        console.log("Respuesta: " + JSON.stringify(resp));
        //window.location.reload();
        return resp;
      })
    );
  }
}
