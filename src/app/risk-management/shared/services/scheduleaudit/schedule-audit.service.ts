import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleAuditService {

  private baseUrl = 'https://localhost:7249/api';
  constructor(private http: HttpClient) { }

  getAuditors() {
    return this.http.get<any[]>(`${this.baseUrl}/v1.0/MasterAuditor`);
  }

  getAuditTypes() {
    return this.http.get<any[]>(`${this.baseUrl}/v1.0/MasterAuditType`);
  }
  scheduleAudit(data: any) {
    return this.http.post<any>(`${this.baseUrl}/Audit`, data);
  }

  getScheduledAudits(data: any) {
    return this.http.post<any[]>(`${this.baseUrl}/Audit/GetAudit`, data);
  }
  getAuditById(auditId: any) {
    return this.http.get<any>(`${this.baseUrl}/Audit/${auditId}`);
  }
  updateAudit(auditId: any, data: any) {
    return this.http.put<any>(`${this.baseUrl}/Audit/${auditId}`, data);
  }

}


