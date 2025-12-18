export type UserRole = 'agent' | 'manager';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type CaseType = 
  | 'Flood Insurance Claim'
  | 'Auto Insurance Claim'
  | 'Health Benefits Appeal'
  | 'Workers Compensation'
  | 'Compliance Review';

export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type CaseStatus = 'Open' | 'In Progress' | 'Pending Review' | 'Escalated' | 'Resolved';

export interface Case {
  id: string;
  caseNumber: string;
  type: CaseType;
  jurisdiction: string;
  priority: Priority;
  monetaryValue: number;
  riskLevel: RiskLevel;
  status: CaseStatus;
  claimantName: string;
  dateOpened: string;
  lastUpdated: string;
  description: string;
  assignedAgent?: string;
}

export interface Citation {
  id: string;
  documentName: string;
  policyVersion: string;
  pageNumber: number;
  sectionId: string;
  lastUpdated: string;
  excerpt: string;
  documentUrl?: string;
}

export interface KnowledgeItem {
  id: string;
  type: 'policy' | 'regulation' | 'sop' | 'compliance' | 'exception';
  title: string;
  content: string;
  confidenceScore: number;
  complianceImpact: RiskLevel;
  requiresReview: boolean;
  citations: Citation[];
}

export interface PolicyDocument {
  id: string;
  name: string;
  type: 'policy' | 'regulation' | 'sop';
  version: string;
  jurisdiction: string;
  lastUpdated: string;
  status: 'active' | 'archived' | 'draft';
  chunkCount: number;
}

export interface PolicyChange {
  id: string;
  documentName: string;
  changeType: 'added' | 'modified' | 'removed';
  oldVersion: string;
  newVersion: string;
  affectedCases: number;
  severity: RiskLevel;
  changedDate: string;
  summary: string;
}

export interface AnalyticsData {
  averageHandlingTime: number;
  complianceErrorReduction: number;
  totalCasesProcessed: number;
  knowledgeUtilization: number;
  topPolicies: { name: string; count: number }[];
  riskTrends: { date: string; high: number; medium: number; low: number }[];
  casesOverTime: { date: string; resolved: number; opened: number }[];
}
