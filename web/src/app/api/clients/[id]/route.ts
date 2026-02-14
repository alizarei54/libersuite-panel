import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, Client } from '@/types';

// Mock data
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const client = mockClients.find((c) => c.id === id);

  if (!client) {
    return NextResponse.json(
      {
        success: false,
        error: 'Client not found',
      } as ApiResponse<null>,
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: client,
  } as ApiResponse<Client>);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
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

  const updatedClient = {
    ...mockClients[clientIndex],
    ...body,
  };

  mockClients[clientIndex] = updatedClient;

  return NextResponse.json({
    success: true,
    data: updatedClient,
    message: 'Client updated successfully',
  } as ApiResponse<Client>);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

  mockClients.splice(clientIndex, 1);

  return NextResponse.json({
    success: true,
    message: 'Client deleted successfully',
  } as ApiResponse<null>);
}
