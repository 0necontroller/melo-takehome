'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronDown, Lightbulb } from 'lucide-react';
import type { InterviewQuestion } from '@/hooks/query/interview/useInterviewQuestions';

interface InterviewQuestionCardProps {
	question: InterviewQuestion;
	index: number;
}

export function InterviewQuestionCard({ question: q, index }: InterviewQuestionCardProps) {
	const [isExpanded, setIsExpanded] = useState(true);

	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.35, delay: index * 0.1, ease: 'easeOut' }}
			id={`question-card-${index + 1}`}
			className="overflow-hidden rounded-2xl border border-[#e8e4df] bg-white shadow-sm"
		>
			{/* Header / toggle */}
			<button
				type="button"
				onClick={() => setIsExpanded((prev) => !prev)}
				className="flex w-full items-start gap-4 px-7 py-6 text-left transition-colors duration-150 hover:bg-[#fafaf8]"
			>
				<div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-sm">
					<span className="text-xs font-bold text-white">{index + 1}</span>
				</div>

				<div className="min-w-0 flex-1">
					<p className="text-[15px] font-semibold leading-snug text-[#1a1a1a]">
						{q.question}
					</p>
					{q.purpose && (
						<p className="mt-1.5 flex items-center gap-1.5 text-sm text-[#8b7d6b]">
							<Lightbulb className="h-3.5 w-3.5 shrink-0 text-amber-400" />
							{q.purpose}
						</p>
					)}
				</div>

				<motion.div
					animate={{ rotate: isExpanded ? 180 : 0 }}
					transition={{ duration: 0.2 }}
				>
					<ChevronDown className="mt-1 h-4 w-4 shrink-0 text-[#a09183]" />
				</motion.div>
			</button>

			{/* Evaluation criteria */}
			<AnimatePresence initial={false}>
				{isExpanded && (
					<motion.div
						key="criteria"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.25, ease: 'easeInOut' }}
						className="overflow-hidden"
					>
						<div className="border-t border-[#f0ece6] px-7 pb-6">
							<p className="mb-3 mt-5 text-xs font-semibold uppercase tracking-wider text-[#a09183]">
								What to look for
							</p>
							<ul className="space-y-2.5">
								{q.lookFor.map((item, i) => (
									<motion.li
										key={i}
										initial={{ opacity: 0, x: -6 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: i * 0.05, duration: 0.2 }}
										className="flex items-start gap-3"
									>
										<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
										<span className="text-sm leading-relaxed text-[#4a3f36]">
											{item}
										</span>
									</motion.li>
								))}
							</ul>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
