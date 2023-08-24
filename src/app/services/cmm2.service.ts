import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Cmm2Service {
  API_URI = 'http://localhost:3002'
  Swal: any;
  constructor(private http: HttpClient) { }

  getAllCmm2(): Observable<any> {
    return this.http.get(`${environment.API_URL2}/cmm2`);
  }

  getCmm2(dateTime): Observable<any> {
    return this.http.get(`${environment.API_URL2}/cmm2/${dateTime}`);
  }
  
}


//http://localhost:3002/cmm2/1561387124

//TODO HACER CAMBIOS IGUAL A CMM