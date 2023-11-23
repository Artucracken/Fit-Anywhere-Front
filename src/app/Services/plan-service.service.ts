import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import { IPlanDataResponse } from '../interfaces/IPlanDataResponse';
import { IPlanResponse } from '../interfaces/IPlanResponse';

@Injectable({
  providedIn: 'root'
})
export class PlanServiceService {

  apiUrl!: string;
  constructor(private http: HttpClient) {
    if (environment.production) {
      this.apiUrl = environment.apiUrl;
    } else {
      this.apiUrl = environment.apiUrl;
    }
  }

  getPlans(): Observable<IPlanResponse> {
    const requestData = {  };
    return this.http
    .post<IPlanResponse>(`${this.apiUrl}/Plan/List`,requestData)
    .pipe(
      map((resp) => {
        console.log("list es: " + JSON.stringify(resp));
        return resp;
      })
    );
  }
}
