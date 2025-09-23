import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierListRequest } from '../models/supplier.model';
import { environment } from '../../../environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
private baseUrl = `${environment.apiUrl}/Suppliers`;

  constructor(private http: HttpClient) {}

  getSuppliers(body : SupplierListRequest): Observable<any> {
    const url = `${this.baseUrl}/GetHomeList`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-country-id': '2'
    });
     
    return this.http.post<any>(url, body, { headers });
  }
}