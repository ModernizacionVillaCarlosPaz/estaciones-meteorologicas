import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CmmService {
  Swal: any;
  constructor(private http: HttpClient) { }

  getLast(): Observable<any> {
    return this.http.get(`${environment.API_URL}/cmm`);
  }

  getRange(startDate:string, endDate:string): Observable<any> {
    return this.http.get(`${environment.API_URL}/cmm/${startDate}/${endDate}`);
  }

  getDay(Date:string): Observable<any> {
    return this.http.get(`${environment.API_URL}/cmm/${Date}`);
  }
  
}

//http://localhost:3000/cmm/1561387124