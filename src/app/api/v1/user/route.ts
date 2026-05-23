import { NextResponse } from 'next/server';
import type { IServerResponse } from '@/types/api';

export async function POST() {
	const body: IServerResponse<null> = {
		success: false,
		message: 'Registration is not implemented in the dummy API.',
		data: null
	};
	return NextResponse.json(body, { status: 501 });
}
