import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Commonservice {
  private baseUrl = 'https://localhost:7249/api/v1.0';

  constructor(private http: HttpClient) {}

  getStates() {
    return this.http.get<any[]>(`${this.baseUrl}/CommonApi/states`);
  }
  getCitiesByState(stateId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/CommonApi/GetCitiesByStateId/${stateId}`);
  }
}
