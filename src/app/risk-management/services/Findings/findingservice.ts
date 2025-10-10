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
    return this.http.get<any>(`${this.baseUrl}?filter=${value}`);
  }

  getfindingsById(Id : string) : Observable<any>{
    return this.http.get<any>((`${this.baseUrl}/By/${Id}`));
  }
  markfindingcomplete(finding : any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateProgres`,finding);
  }

  getById(Id : string) : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${Id}`);
  }
  deletefinding(Id : string) : Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${Id}`);
  }
  GetfindingSummary() : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/findingSummary`);
  }

}
