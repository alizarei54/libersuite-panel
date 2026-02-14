import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, Client } from '@/types';

const mockClients: Client[] = [
  {
    id: '1',
    username: 'user1',
    status: 'active',
    trafficLimit: 100,
    trafficUsed: 45.5,
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    lastUsed: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
];

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; action: string }> }
) {
  const { id, action } = await params;
  const clientIndex = mockClients.findIndex((c) => c.id === id);

  if (clientIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        error: 'Client not found',
      } as ApiResponse<null>,
      { status: 404 }
    );
  }

  let newStatus: 'active' | 'disabled' | 'expired' = mockClients[clientIndex].status;

  if (action === 'enable') {
    newStatus = 'active';
  } else if (action === 'disable') {
    newStatus = 'disabled';
  } else {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid action',
      } as ApiResponse<null>,
      { status: 400 }
    );
  }

  mockClients[clientIndex].status = newStatus;

  return NextResponse.json({
    success: true,
    data: mockClients[clientIndex],
    message: `Client ${action}d successfully`,
  } as ApiResponse<Client>);
}
