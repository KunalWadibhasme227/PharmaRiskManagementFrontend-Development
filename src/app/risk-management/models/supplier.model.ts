
// Models used by component + service (no DTO required)

export type ComplianceStatus = "compliant" | "warning" | "non-compliant";
export type RiskLevel = "low" | "medium" | "high";

export interface Supplier {
  id: string;
  name: string;
  type: string;
  location: string;
  compliance: ComplianceStatus;
  contact: string;
  certificate?: string;
  lastAudit?: string;
  riskLevel: RiskLevel;
}

/** Strongly-typed request object for GetHomeList */
export interface SupplierListRequest {
  search: string;
  legalStructure: string | null;
  primaryIndustry: string | null;
  classificationIds: number[] | null;
  naics: string | null;
  country: number;
  state: string | null;
  city: string | null;
  fromDate: string | null;
  toDate: string | null;
  yearEstablished: number | null;
  noOfEmployees: { min: number; max: number; };
  annualRevenue: { min: number; max: number; };
  PageNumber: number;
  PageSize: number;
  isAllApproved: boolean;
  isAllUnApproved: boolean;
  inactive: boolean;
  syncHistoryId: number | null;
  epId: number | null;
}
