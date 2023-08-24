import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CmmService {
  API_URI = 'http://localhost:3000'
  Swal: any;
  constructor(private http: HttpClient) { }

  getLast(): Observable<any> {
    return this.http.get(`${environment.API_URL}/cmm`);
  }

  getCmm(dateTime): Observable<any> {
    return this.http.get(`${environment.API_URL}/cmm/${dateTime}`);
  }
  
}

//http://localhost:3000/cmm/1561387124