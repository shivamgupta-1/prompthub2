/**
 * Dashboard Configuration - Mock Data
 * Service Status Dashboard with 100 services across 6 categories
 */

import type { ServiceCategory, DashboardMetadata } from './types';

export const DASHBOARD_METADATA: DashboardMetadata = {
  environment: 'Production',
  region: 'us-east-1',
  totalTiles: 100,
  uniqueAPIs: 5,
};

export const STATUS_LEGEND = [
  { status: 'running', label: 'Running (2xx & fast)', color: 'bg-green-500' },
  { status: 'not-certain', label: 'Not certain (slow / borderline)', color: 'bg-yellow-500' },
  { status: 'down', label: 'Down (error / timeout)', color: 'bg-red-500' },
];

// export const SERVICE_CATEGORIES: ServiceCategory[] = [
//   {
//     id: 'policy-services',
//     categoryName: 'POLICY SERVICES',
//     categoryDescription: 'Rating, rules, quotes, lifecycle',
//     services: [
//       { id: 1, name: 'Rating Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 2, name: 'Infinity Reconcil Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 3, name: 'Quote Service', status: 'not-certain', httpStatus: 'HTTP → —' },
//       { id: 4, name: 'Policy Issuance Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 5, name: 'Policy Lifecycle Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 6, name: 'Coverage Service', status: 'not-certain', httpStatus: 'HTTP → —' },
//       { id: 7, name: 'Risk Profile Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 8, name: 'Policy Document Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 9, name: 'Premium Calculation Service', status: 'running', httpStatus: 'HTTP → —' },
//     ],
//   },
//   {
//     id: 'billing-services',
//     categoryName: 'BILLING SERVICES',
//     categoryDescription: 'Accounts, invoices, payments',
//     services: [
//       { id: 1, name: 'Billing Account Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 4, name: 'Invoice Generation Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 5, name: 'Payment Processing Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 6, name: 'Payment Allocation Service', status: 'down', httpStatus: 'HTTP → —' },
//       { id: 7, name: 'Refund Chargeback Service', status: 'not-certain', httpStatus: 'HTTP → —' },
//       { id: 8, name: 'Collections Dunning Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 9, name: 'Premium Finance Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 0, name: 'Recurring Payments Service', status: 'not-certain', httpStatus: 'HTTP → —' },
//       { id: 2, name: 'Billing Adjustment Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 3, name: 'Billing Report Service', status: 'running', httpStatus: 'HTTP → —' },
//     ],
//   },
//   {
//     id: 'claims-services',
//     categoryName: 'CLAIMS SERVICES',
//     categoryDescription: 'FNOL, fraud, settlement',
//     services: [
//       { id: 25, name: 'FNOL UI Screen', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 26, name: 'FNOL Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 27, name: 'Fraud Check UI Screen', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 28, name: 'Fraud Check Service', status: 'not-certain', httpStatus: 'HTTP → —' },
//       { id: 29, name: 'Infinity Incidents Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 30, name: 'Coverage Validation Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 31, name: 'Third-party Integration Service', status: 'down', httpStatus: 'HTTP → —' },
//       { id: 32, name: 'Claim Payments Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 33, name: 'Claim Assignment Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 34, name: 'Reserve Management Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 35, name: 'Claim Closure Service', status: 'not-certain', httpStatus: 'HTTP → —' },
//       { id: 36, name: 'Claim Audit Service', status: 'running', httpStatus: 'HTTP → —' },
//     ],
//   },
//   {
//     id: 'product-filings',
//     categoryName: 'PRODUCT & FILINGS',
//     categoryDescription: 'Rates, forms, pricing versions',
//     services: [
//       { id: 37, name: 'Product Master Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 38, name: 'Coverage Catalogue Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 39, name: 'Rate Table Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 40, name: 'Form Mapping Service', status: 'not-certain', httpStatus: 'HTTP → —' },
//       { id: 41, name: 'Discount Surcharge Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 42, name: 'Regulatory Validation Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 43, name: 'Approval Workflow Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 44, name: 'Pricing Versioning Service', status: 'down', httpStatus: 'HTTP → —' },
//       { id: 45, name: 'Product Catalog Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 46, name: 'Benefit Design Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 47, name: 'Filing History Service', status: 'not-certain', httpStatus: 'HTTP → —' },
//       { id: 48, name: 'Compliance Service', status: 'running', httpStatus: 'HTTP → —' },
//     ],
//   },
//   {
//     id: 'shared-services',
//     categoryName: 'SHARED SERVICES',
//     categoryDescription: 'Enterprise & platform services',
//     services: [
//       { id: 49, name: 'Identity Auth Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 50, name: 'Document Storage Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 51, name: 'Notification Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 52, name: 'Audit Trace Service', status: 'not-certain', httpStatus: 'HTTP → —' },
//       { id: 53, name: 'Search Indexing Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 54, name: 'Event Stream Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 55, name: 'Data Privacy Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 56, name: 'Telemetry Observability Service', status: 'down', httpStatus: 'HTTP → —' },
//       { id: 57, name: 'User Management Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 58, name: 'Configuration Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 59, name: 'Logging Service', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 60, name: 'Cache Management Service', status: 'not-certain', httpStatus: 'HTTP → —' },
//     ],
//   },
//   {
//     id: 'ai-snapshot',
//     categoryName: 'AI SNAPSHOT',
//     categoryDescription: 'Quick health report',
//     services: [
//       { id: 61, name: 'Overall Health Status', status: 'not-certain', httpStatus: 'HTTP → —' },
//       { id: 62, name: 'API Availability Monitor', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 63, name: 'Performance Analytics', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 64, name: 'Error Rate Monitor', status: 'not-certain', httpStatus: 'HTTP → —' },
//       { id: 65, name: 'Latency Tracker', status: 'running', httpStatus: 'HTTP → —' },
//       { id: 66, name: 'System Health Report', status: 'running', httpStatus: 'HTTP → —' },
//     ],
//   },
// ];
