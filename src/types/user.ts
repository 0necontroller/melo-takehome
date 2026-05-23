import type { UserRole } from '@/lib/auth/roles';

export interface UserType {
	id: string;
	email: string;
	name: string;
	role: UserRole;
}
