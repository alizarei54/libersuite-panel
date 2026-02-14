import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, Client } from '@/types';

// Mock data - در حالت واقعی با Libersuite backend ارتباط برقرار می‌کنیم
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
  {
    id: '2',
    username: 'user2',
    status: 'active',
    trafficLimit: 50,
    trafficUsed: 35.2,
    expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const response: ApiResponse<Client[]> = {
      success: true,
      data: mockClients,
    };
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch clients',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, trafficLimitGb = 100, expiresInDays = 30 } = body;

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Username and password are required',
        } as ApiResponse<null>,
        { status: 400 }
      );
    }

    const newClient: Client = {
      id: Date.now().toString(),
      username,
      status: 'active',
      trafficLimit: trafficLimitGb,
      trafficUsed: 0,
      expiryDate: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      lastUsed: null,
    };

    mockClients.push(newClient);

    const response: ApiResponse<Client> = {
      success: true,
      data: newClient,
      message: 'Client created successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create client',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}
