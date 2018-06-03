import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import ENVIROMENT from '../environments/environment';

@Injectable()
export class HeatAreasService {
  url: string = ENVIROMENT.url;

  constructor(
    private http: HttpClient
  ) { }

  loadHeatAreas(params = {}): Observable<any> {
    let httpParams = new HttpParams();

    for (const key of Object.keys(params)) {
      httpParams = httpParams.append(key, params[key] instanceof Object ? JSON.stringify(params[key]) : params[key]);
    }

    return this.http.get<any>(`${this.url}/heatareas`, { params: httpParams });
  }

}
