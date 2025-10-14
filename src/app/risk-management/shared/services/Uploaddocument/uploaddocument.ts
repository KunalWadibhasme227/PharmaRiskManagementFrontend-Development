import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedUploadDocumentDto, UploadDocumentRequestDto } from '../../../models/Uploaddocumentmodel/uploaddocument';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Uploaddocument {

  private baseUrl = 'https://localhost:7249/api';
  private selectedDocument$ = new BehaviorSubject<any | null>(null);
  constructor(private http: HttpClient) { }

  // getUploadDocumentList(data: any) {
  //   return this.http.post<any[]>(`${this.baseUrl}/UploadDocuments/GetUploadDocuments`, data);
  // }
  getUploadDocumentList(data: UploadDocumentRequestDto) {
  return this.http.post<PagedUploadDocumentDto>(
    `${this.baseUrl}/UploadDocuments/GetUploadDocuments`, 
    data
  );
}
  getUploadDocumentById(documentId: number) {
  return this.http.get(`https://localhost:7249/api/UploadDocuments/${documentId}`);
  }
  InsertUploadDocument(data: any) {
    return this.http.post<any>(`${this.baseUrl}/UploadDocuments`, data);
  }
  UpdateUploadDocument(documentId: any, data: any) {
    return this.http.put<any>(`${this.baseUrl}/UploadDocuments/${documentId}`, data);
  }
  DeleteUploadDocument(documentId: any, data: any) {
    return this.http.delete<any>(`${this.baseUrl}/UploadDocuments/${documentId}`, data);
  }
  DownloadUploadDocument(documentId: any) {
  return this.http.get(`${this.baseUrl}/UploadDocuments/Download/${documentId}`, {
    responseType: 'blob'
  });
  }

 DetailsUploadDocument(documentId: any) {
    return this.http.get<any>(`${this.baseUrl}/UploadDocuments/ViewDetails/${documentId}`);
  }


  getAuditTypes() {
    return this.http.get<any[]>(`${this.baseUrl}/v1.0/MasterAuditType`);
  }

  getCategiores() {
    return this.http.get<any[]>(`${this.baseUrl}/v1.0/MasterCategory`);
  }

  setDocument(document: any) {
    this.selectedDocument$.next(document);
  }
  
  getDocument() {
    return this.selectedDocument$.asObservable();
  }

  getCurrentDocument() {
    return this.selectedDocument$.value;
  }
  clearCurrentDocument() {
    this.selectedDocument$.next(null); 
    
  }

}
