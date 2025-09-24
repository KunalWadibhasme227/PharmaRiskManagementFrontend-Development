import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleAuditService {
  private baseUrl = 'https://localhost:7249/api/v1.0';
  constructor(private http: HttpClient) {}

  getAuditors() {
    return this.http.get<any[]>(`${this.baseUrl}/MasterAuditor`);
  }

  getAuditTypes() {
    return this.http.get<any[]>(`${this.baseUrl}/MasterAuditType`);
  } 
}
