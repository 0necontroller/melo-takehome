import { NextResponse } from 'next/server';
import type { IServerResponse } from '@/types/api';

const AUTH_COOKIE = 'mock_auth';

export async function GET() {
	const body: IServerResponse<null> = {
		success: true,
		message: 'Logged out.',
		data: null
	};

	const response = NextResponse.json(body, { status: 200 });
	response.cookies.set(AUTH_COOKIE, '', {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 0
	});
	return response;
}
