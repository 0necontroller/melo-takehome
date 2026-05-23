'use client';

import { Sparkles, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/query/auth/useAuth';

export function DashboardNavbar() {
	const { logout, isLoading } = useAuth();

	return (
		<header className="sticky top-0 z-10 border-b border-[#e8e4df] bg-white/80 backdrop-blur-sm">
			<div className="mx-auto flex max-w-4xl items-center px-6 py-4">
				{/* Logo / Brand */}
				<div className="flex flex-1 items-center gap-3">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-emerald-500 to-teal-600 shadow-sm">
						<Sparkles className="h-4 w-4 text-white" />
					</div>
					<div className="flex items-center gap-2">
						<span className="font-semibold tracking-tight text-[#1a1a1a]">
							InterviewAI
						</span>
						<span className="rounded-full bg-[#f0ece6] px-2 py-0.5 text-xs font-medium text-[#8b7d6b]">
							Powered by Gemini
						</span>
					</div>
				</div>

				{/* Logout */}
				<button
					type="button"
					id="logout-btn"
					onClick={() => logout()}
					disabled={isLoading}
					className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#6b5f54] transition-all duration-150 hover:bg-[#f0ece6] hover:text-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-40"
				>
					<LogOut className="h-4 w-4" />
					<span>Logout</span>
				</button>
			</div>
		</header>
	);
}
