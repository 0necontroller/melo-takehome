'use client';

import { Sparkles, LogOut, History } from 'lucide-react';
import { useAuth } from '@/hooks/query/auth/useAuth';
import { Button } from '@/components/ui/button';

interface DashboardNavbarProps {
	historyCount?: number;
	onHistoryClick?: () => void;
}

export function DashboardNavbar({
	historyCount = 0,
	onHistoryClick
}: DashboardNavbarProps) {
	const { logout, isLoading } = useAuth();

	return (
		<header className="sticky top-0 z-10 border-b border-[#e8e4df] bg-white/80 backdrop-blur-sm">
			<div className="mx-auto flex max-w-4xl items-center px-6 py-4">
				<div className="flex flex-1 items-center gap-3">
					<span className="text-xl font-semibold tracking-tight">
						InterviewAI
					</span>
				</div>

				<div className="flex items-center gap-1">
					<Button
						type="button"
						id="history-btn"
						variant="ghost"
						onClick={onHistoryClick}
						className="relative flex h-auto items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#6b5f54] transition-all duration-150 hover:bg-[#f0ece6] hover:text-[#1a1a1a]"
					>
						<History className="h-4 w-4" />
						<span>History</span>
						{historyCount > 0 && (
							<span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
								{historyCount > 9 ? '9+' : historyCount}
							</span>
						)}
					</Button>

					<div className="mx-1 h-4 w-px bg-[#e8e4df]" />

					<Button
						type="button"
						id="logout-btn"
						variant="ghost"
						onClick={() => logout()}
						disabled={isLoading}
						className="flex h-auto items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#6b5f54] transition-all duration-150 hover:bg-[#f0ece6] hover:text-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-40"
					>
						<LogOut className="h-4 w-4" />
						<span>Logout</span>
					</Button>
				</div>
			</div>
		</header>
	);
}
