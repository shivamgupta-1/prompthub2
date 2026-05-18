/**
 * Service Status Dashboard - TypeScript Types and Interfaces
 */

// types.ts

export type ServiceStatus = 'running' | 'not-certain' | 'down';

export interface Service {
  id: number;
  name: string;
  url: string;
  status: ServiceStatus;
}

export interface ServiceCategory {
  categoryId: string | number;
  categoryName: string;
  categoryDescription: string;
  services: Service[];
}

export interface DashboardMetadata {
  environment: 'Production' | 'Staging' | 'Development';
  region: string;
  totalTiles: number;
  uniqueAPIs: number;
}

export interface StatusIndicatorProps {
  status: ServiceStatus;
  label?: string;
}
