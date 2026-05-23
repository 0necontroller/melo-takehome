'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
	Trash2,
	ChevronDown,
	Clock,
	AlertCircle,
	CheckCircle2
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import type { HistoryEntry } from '@/hooks/useInterviewHistory';
import type { InterviewQuestion } from '@/hooks/query/interview/useInterviewQuestions';

interface HistorySheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	history: HistoryEntry[];
	onRemove: (id: string) => void;
	onClearAll: () => void;
	/** Restore a past result into the main view */
	onRestore: (jobTitle: string, questions: InterviewQuestion[]) => void;
}

function HistoryEntryItem({
	entry,
	onRemove,
	onRestore
}: {
	entry: HistoryEntry;
	onRemove: (id: string) => void;
	onRestore: (jobTitle: string, questions: InterviewQuestion[]) => void;
}) {
	const [expanded, setExpanded] = useState(false);

	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, x: 24, transition: { duration: 0.2 } }}
			className="overflow-hidden rounded-xl border border-[#e8e4df] bg-white"
		>
			{/* Entry header */}
			<div className="flex items-start gap-3 px-4 py-3.5">
				<div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
					<CheckCircle2 className="h-3.5 w-3.5 text-white" />
				</div>

				<div className="min-w-0 flex-1">
					<p className="truncate text-sm font-semibold text-[#1a1a1a]">
						{entry.jobTitle}
					</p>
					<p className="mt-0.5 flex items-center gap-1 text-xs text-[#a09183]">
						<Clock className="h-3 w-3" />
						{formatDistanceToNow(new Date(entry.createdAt), {
							addSuffix: true
						})}
					</p>
				</div>

				<div className="flex shrink-0 items-center gap-1">
					<Button
						type="button"
						variant="ghost"
						size="xs"
						onClick={() => onRestore(entry.jobTitle, entry.questions)}
						className="h-auto rounded-md px-2.5 py-1 text-xs font-medium text-emerald-700 transition-colors duration-150 hover:bg-emerald-50 hover:text-emerald-700"
					>
						Load
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="icon-xs"
						onClick={() => setExpanded((p) => !p)}
						className="rounded-md p-1.5 text-[#a09183] transition-colors duration-150 hover:bg-[#f5f1ec]"
						aria-label="Toggle questions"
					>
						<motion.div
							animate={{ rotate: expanded ? 180 : 0 }}
							transition={{ duration: 0.2 }}
						>
							<ChevronDown className="h-3.5 w-3.5" />
						</motion.div>
					</Button>
				</div>
			</div>

			{/* Expanded questions */}
			<AnimatePresence initial={false}>
				{expanded && (
					<motion.div
						key="questions"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.22, ease: 'easeInOut' }}
						className="m-2 overflow-hidden"
					>
						<div className="space-y-2 border-t border-[#f5f1ec] py-4">
							{entry.questions.map((q, i) => (
								<div key={i} className="flex items-start gap-2">
									<span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#f0ece6] text-[10px] font-bold text-[#8b7d6b]">
										{i + 1}
									</span>
									<p className="text-xs leading-relaxed text-[#5a4d42]">
										{q.question}
									</p>
								</div>
							))}
						</div>

						<Button
							type="button"
							variant="outline"
							onClick={() => onRemove(entry.id)}
							className="w-full rounded-md p-1.5 text-[#c4b8ac] transition-colors duration-150 hover:bg-red-50 hover:text-red-500"
							aria-label="Remove entry"
						>
							<Trash2 className="h-3.5 w-3.5" />
							Delete
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

export function HistorySheet({
	open,
	onOpenChange,
	history,
	onRemove,
	onClearAll,
	onRestore
}: HistorySheetProps) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				className="flex w-full flex-col bg-[#fafaf8] p-0 sm:max-w-md"
			>
				<SheetHeader className="border-b border-[#e8e4df] bg-white px-6 py-5">
					<div className="">
						<div>
							<SheetTitle className="text-lg font-semibold text-black">
								Generation History
							</SheetTitle>
							<SheetDescription className="text-muted-foreground mt-0.5 text-sm">
								{history.length === 0
									? 'No generations yet'
									: `${history.length} saved generation${history.length === 1 ? '' : 's'}`}
							</SheetDescription>
						</div>

						{history.length > 0 && (
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={onClearAll}
								className="mt-2 flex h-auto items-center gap-1.5 rounded-lg border border-red-500 px-3 py-1.5 text-xs font-medium text-red-500 transition-colors duration-150 hover:bg-red-50 hover:text-red-500"
							>
								<Trash2 className="h-3.5 w-3.5" />
								Clear all
							</Button>
						)}
					</div>
				</SheetHeader>

				<div className="flex-1 overflow-y-auto p-4">
					{history.length === 0 ? (
						<div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f0ece6]">
								<AlertCircle className="h-5 w-5 text-[#b5a99a]" />
							</div>
							<p className="font-medium text-[#8b7d6b]">No history yet</p>
							<p className="max-w-[200px] text-sm leading-relaxed text-[#b5a99a]">
								Generate interview questions and they'll appear here.
							</p>
						</div>
					) : (
						<motion.div layout className="space-y-3">
							<AnimatePresence mode="popLayout">
								{history.map((entry) => (
									<HistoryEntryItem
										key={entry.id}
										entry={entry}
										onRemove={onRemove}
										onRestore={(title, questions) => {
											onRestore(title, questions);
											onOpenChange(false);
										}}
									/>
								))}
							</AnimatePresence>
						</motion.div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
