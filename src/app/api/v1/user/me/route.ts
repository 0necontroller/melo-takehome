import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { UserRole } from '@/lib/auth/roles';
import { ENV } from '@/lib/environments';
import type { IServerResponse } from '@/types/api';
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

export async function GET() {
	const cookieStore = await cookies();
	const authCookie = cookieStore.get(AUTH_COOKIE);

	if (!authCookie || authCookie.value !== '1') {
		const body: IServerResponse<null> = {
			success: false,
			message: 'Not authenticated.',
			data: null
		};
		return NextResponse.json(body, { status: 401 });
	}

	const email = ENV.TEST_USER_EMAIL || 'test@example.com';
	const body: IServerResponse<UserType> = {
		success: true,
		message: 'Profile fetched.',
		data: buildUser(email)
	};
	return NextResponse.json(body, { status: 200 });
}
