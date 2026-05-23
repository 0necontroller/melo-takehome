export const ENV = {
	NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || '',
	NODE_ENV: process.env.NODE_ENV || 'development',

	TEST_USER_PASSWORD: process.env.TEST_USER_PASSWORD || '',
	TEST_USER_EMAIL: process.env.TEST_USER_EMAIL || '',

	GEMINI_API_KEY: process.env.GEMINI_API_KEY || ''
};
