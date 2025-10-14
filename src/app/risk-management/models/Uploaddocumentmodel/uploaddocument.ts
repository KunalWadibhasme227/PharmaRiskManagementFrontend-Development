// upload-document.model.ts

export interface UploadDocumentDto {
  documentId: number;
  documentName: string;
  categoryId: number;
  categoryName?: string;
  auditId: number;
  auditName: string;
  // audit?: string;
  description?: string;
  expiryDate?: string;
  createdDate: string; 
  version: string;
  filePath?: string;
  fileSizeKB?: number;
  status: "Approved" | "Under Review" | "Expired";
  totalCount: number;
}

export interface PagedUploadDocumentDto {
  records: UploadDocumentDto[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export interface UploadDocumentRequestDto {
  searchText?: string;
  pageNumber: number;
  pageSize: number;
}

export interface UploadDocumentCreationDto {
  documentName: string;
  categoryId: number;
  auditId: number;
  // audit?: string;
  description?: string;
  version: string;
  status: string;
  expiryDate?: string;
  createdDate?: string;
  filePath?: string;
  fileSizeKB?: number;
}

export interface UploadDocumentUpdateDto {
  documentName: string;
  categoryId: number;
  auditId: number;
  // audit?: string;
  description?: string;
  expiryDate?: string;
  filePath?: string;
  fileSizeKB?: number;
  version: string;
  status: string;
}

export interface FileDownloadDto {
  fileContent: string; 
  fileName: string;
  contentType: string;
}

export interface Document {
  id: number;
  name: string;
  category: string;
  supplier: string;
  version: string;
  status: "Approved" | "Under Review" | "Expired";
  uploadDate: string;
  expiryDate: string;
  size: string;
}

export interface Category {
  name: string;
  count: number;
  pending: number;
}

export interface Workflow {
  id: number;
  name: string;
  status: "Active" | "Paused";
  documents: number;
  avgTime: string;
}