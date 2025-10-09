import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http : HttpClient)
  {}
  private baseUrl : string ='https://localhost:7249/api/Material';
  add(formValue: any): Observable<any> {
      return this.http.post<any>(this.baseUrl, formValue);
  }
  update(formValue: any, Id : string): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/Id`, formValue);
  }
  getById(id: string) {
    return;
    throw new Error('Method not implemented.');
  }

  getMaterials(data : any){
    return  this.http.post<any>(`${this.baseUrl}/GetMaterial`,data);
  }
  
}
