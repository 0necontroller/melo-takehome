import { NextResponse } from 'next/server';
import { UserRole } from '@/lib/auth/roles';
import { ENV } from '@/lib/environments';
import type { IServerResponse, LoginRequest } from '@/types/api';
import type { UserType } from '@/types/user';

const AUTH_COOKIE = 'mock_auth';

const buildUser = (email: string): UserType => {
	const name = email.split('@')[0] || 'Test User';

	return {
		id: 'user_1',
		email,
		name,
		role: UserRole.USER
	};
};

export async function POST(request: Request) {
	const testEmail = ENV.TEST_USER_EMAIL;
	const testPassword = ENV.TEST_USER_PASSWORD;

	if (!testEmail || !testPassword) {
		const body: IServerResponse<null> = {
			success: false,
			message:
				'Missing TEST_USER_EMAIL or TEST_USER_PASSWORD environment values.',
			data: null
		};
		return NextResponse.json(body, { status: 500 });
	}

	let payload: LoginRequest;
	try {
		payload = (await request.json()) as LoginRequest;
	} catch {
		const body: IServerResponse<null> = {
			success: false,
			message: 'Invalid request payload.',
			data: null
		};
		return NextResponse.json(body, { status: 400 });
	}

	if (payload.email !== testEmail || payload.password !== testPassword) {
		const body: IServerResponse<null> = {
			success: false,
			message: 'Invalid email or password.',
			data: null
		};
		return NextResponse.json(body, { status: 401 });
	}

	const user = buildUser(testEmail);
	const body: IServerResponse<{ user: UserType; accessToken: string }> = {
		success: true,
		message: 'Login successful.',
		data: {
			user,
			accessToken: 'dummy-access-token'
		}
	};

	const response = NextResponse.json(body, { status: 200 });
	response.cookies.set(AUTH_COOKIE, '1', {
		httpOnly: true,
		sameSite: 'lax',
		path: '/'
	});
	return response;
}
