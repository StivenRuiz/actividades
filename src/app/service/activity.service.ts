import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../models/utils/response.model';
import { Activity } from '../models/activity.model';
import { Employee } from '../models/employee.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
  export class ActivityService {
    private urlApi: string;

    constructor(private http: HttpClient) {
      this.urlApi = environment.urlApi;
    }

    getActivities(): Observable<Response<Activity>> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
      const options = {
        headers,
      };
      return this.http.get(`${this.urlApi}actividades/actividades`, options).pipe(
        map((resp: Response<Activity>) => {
          return resp;
        })
      );
    }

    getEmployees(): Observable<Response<Employee>> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
      const options = {
        headers,
      };
      return this.http.get(`${this.urlApi}empleados/empleados`, options).pipe(
        map((resp: Response<Employee>) => {
          return resp;
        })
      );
    }

    postActivity(activity: Activity): Observable<Response<Activity>> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
      const options = {
        headers,
      };
      return this.http.post(`${this.urlApi}actividades/actividad`, activity, options).pipe(
        map((resp: Response<Activity>) => {
          return resp;
        })
      );
    }

    deleteActivity(idActivity: number): Observable<Response<Activity>> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
      const options = {
        headers,
      };
      return this.http.delete(`${this.urlApi}actividades/actividad/` + idActivity, options).pipe(
        map((resp: Response<Activity>) => {
          return resp;
        })
      );
    }
}