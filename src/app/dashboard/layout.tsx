import { ProtectedRoute } from '@/components/ProtectedRoute';
import { UserRole } from '@/lib/auth/roles';

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<ProtectedRoute allowedRoles={[UserRole.USER]}>{children}</ProtectedRoute>
	);
}
