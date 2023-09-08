import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Cmm1Service {
  API_URI = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  getLast(): Observable<any> {
    return this.http.get(`${environment.API_URL}/cmm1`);
  }

  getRange(startDate:string, endDate:string): Observable<any> {
    return this.http.get(`${environment.API_URL}/cmm1/${startDate}/${endDate}`);
  }

  getDay(Date:string): Observable<any> {
    return this.http.get(`${environment.API_URL}/cmm1/${Date}`);
  }
  
}

//http://localhost:3001/cmm1/1561387124

//TODO HACER CAMBIOS IGUAL A CMM