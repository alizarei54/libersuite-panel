import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, ServerStats } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const stats: ServerStats = {
      totalClients: 12,
      activeClients: 8,
      totalTraffic: 156.8,
      port53Status: true,
      uptime: 45 * 24 * 60 * 60, // 45 days in seconds
      cpuUsage: 23.5,
      memoryUsage: 45.2,
    };

    const response: ApiResponse<ServerStats> = {
      success: true,
      data: stats,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch server stats',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}
