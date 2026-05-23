export interface IServerResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

export interface LoginRequest {
	email: string;
	password: string;
}
