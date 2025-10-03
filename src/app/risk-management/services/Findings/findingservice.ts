import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Findingservice {

  private baseUrl: string = 'https://localhost:7249/api/Finding';

  constructor(private http: HttpClient) { }

  // Proper method to post data
  Addfindings(value: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, value);
  }

  getfindings(value : any): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}?filter=`,value)
  }
  
}
