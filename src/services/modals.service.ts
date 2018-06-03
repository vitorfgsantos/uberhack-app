import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ModalsService {
  // url: string = environment.url;
  // url: string = 'https://uberhack-api.herokuapp.com/v1';
  url: string = 'http://localhost:3000/v1';

  constructor(
    private http: HttpClient
  ) { }

  loadMapsModals(mode, params = {}): Observable<any> {
    let httpParams = new HttpParams();

    for (const key of Object.keys(params)) {
      httpParams = httpParams.append(key, params[key] instanceof Object ? JSON.stringify(params[key]) : params[key]);
    }

    return this.http.get<any>(`${this.url}/routers/maps/${mode}`, { params: httpParams });
  }

  loadUberModals(params = {}): Observable<any> {
    let httpParams = new HttpParams();

    for (const key of Object.keys(params)) {
      httpParams = httpParams.append(key, params[key] instanceof Object ? JSON.stringify(params[key]) : params[key]);
    }

    return this.http.get<any>(`${this.url}/routers/uber`, { params: httpParams });
  }

}
