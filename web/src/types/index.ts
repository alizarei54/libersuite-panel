/**
 * Client/User Types for Libersuite Panel
 */

export interface Client {
  id: string;
  username: string;
  status: 'active' | 'disabled' | 'expired';
  trafficLimit: number; // GB
  trafficUsed: number; // GB
  expiryDate: string; // ISO date string
  createdAt: string;
  lastUsed: string | null;
  sshConfig?: string;
  dnsttConfig?: string;
}

export interface CreateClientRequest {
  username: string;
  password: string;
  trafficLimitGb?: number;
  expiresInDays?: number;
}

export interface ServerStats {
  totalClients: number;
  activeClients: number;
  totalTraffic: number;
  port53Status: boolean;
  uptime: number;
  cpuUsage: number;
  memoryUsage: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
