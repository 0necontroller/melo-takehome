'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, RotateCcw, Sparkles } from 'lucide-react';
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { InterviewQuestionCard } from '@/components/dashboard/InterviewQuestionCard';
import { HistorySheet } from '@/components/dashboard/HistorySheet';
import { Button } from '@/components/ui/button';
import { useGenerateInterviewQuestions } from '@/hooks/query/interview/useInterviewQuestions';
import { useInterviewHistory } from '@/hooks/useInterviewHistory';
import type { InterviewQuestion } from '@/hooks/query/interview/useInterviewQuestions';

const EXAMPLE_ROLES = [
	'Customer Success Manager',
	'Software Engineer',
	'Product Manager',
	'UX Designer',
	'Data Scientist'
];

export default function Dashboard() {
	const [jobTitle, setJobTitle] = useState('');
	const [historyOpen, setHistoryOpen] = useState(false);
	const [restoredQuestions, setRestoredQuestions] = useState<
		InterviewQuestion[] | null
	>(null);
	const [restoredTitle, setRestoredTitle] = useState('');
	const resultsRef = useRef<HTMLDivElement>(null);

	const {
		mutate: generateQuestions,
		data,
		isPending: isLoading,
		error,
		reset
	} = useGenerateInterviewQuestions();

	const { history, addEntry, removeEntry, clearAll } = useInterviewHistory();

	// Show restored result or freshly generated result
	const activeQuestions: InterviewQuestion[] =
		restoredQuestions ?? data?.questions ?? [];
	const activeTitle = restoredQuestions ? restoredTitle : jobTitle;

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!jobTitle.trim() || isLoading) return;

		// Clear any restored state
		setRestoredQuestions(null);
		setRestoredTitle('');

		generateQuestions(jobTitle.trim(), {
			onSuccess: (result) => {
				addEntry(jobTitle.trim(), result.questions);

				setTimeout(() => {
					resultsRef.current?.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}, 100);
			}
		});
	};

	const handleReset = () => {
		reset();
		setJobTitle('');
		setRestoredQuestions(null);
		setRestoredTitle('');
	};

	const handleRoleSelect = (role: string) => {
		setJobTitle(role);
		reset();
		setRestoredQuestions(null);
		setRestoredTitle('');
	};

	const handleRestore = (title: string, questions: InterviewQuestion[]) => {
		setRestoredQuestions(questions);
		setRestoredTitle(title);
		setJobTitle(title);
		setTimeout(() => {
			resultsRef.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}, 100);
	};

	return (
		<div className="min-h-screen bg-[#fafaf8]">
			<DashboardNavbar
				historyCount={history.length}
				onHistoryClick={() => setHistoryOpen(true)}
			/>

			<HistorySheet
				open={historyOpen}
				onOpenChange={setHistoryOpen}
				history={history}
				onRemove={removeEntry}
				onClearAll={clearAll}
				onRestore={handleRestore}
			/>

			<main className="mx-auto max-w-4xl px-6 py-16">
				{/* Hero */}
				<motion.div
					className="mb-14 text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: 'easeOut' }}
				>
					<h1 className="mb-4 text-4xl leading-tight font-bold tracking-tight text-[#1a1a1a] sm:text-5xl">
						Generate thoughtful
						<br />
						<span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
							interview questions
						</span>
					</h1>
					<p className="mx-auto max-w-xl text-lg leading-relaxed text-[#6b5f54]">
						Enter any job title and get 3 role-specific interview questions with
						detailed evaluation criteria powered by AI.
					</p>
				</motion.div>

				{/* Input Form */}
				<motion.div
					className="mb-6 rounded-2xl border border-[#e8e4df] bg-white p-8 shadow-sm"
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
				>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="job-title-input"
								className="mb-2 block text-sm font-semibold text-[#1a1a1a]"
							>
								Job Title
							</label>
							<div className="relative">
								<input
									id="job-title-input"
									type="text"
									value={jobTitle}
									onChange={(e) => setJobTitle(e.target.value)}
									placeholder="e.g. Customer Success Manager"
									disabled={isLoading}
									className="w-full rounded-xl border-2 border-[#e8e4df] bg-[#fafaf8] px-5 py-4 pr-14 text-lg font-medium text-[#1a1a1a] placeholder-[#b5a99a] transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
								/>
								<Button
									type="submit"
									disabled={!jobTitle.trim() || isLoading}
									id="generate-questions-btn"
									size="icon-lg"
									className="group absolute top-1/2 right-3 flex -translate-y-1/2 items-center justify-center rounded-lg bg-emerald-500 shadow-sm transition-all duration-200 hover:bg-emerald-600 hover:shadow disabled:cursor-not-allowed disabled:bg-[#d9d3cc]"
								>
									{isLoading ? (
										<div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
									) : (
										<Send className="h-4 w-4 text-white transition-transform group-hover:translate-x-0.5" />
									)}
								</Button>
							</div>
						</div>

						{/* Quick role chips */}
						<div>
							<p className="mb-2.5 text-xs font-medium tracking-wider text-[#a09183] uppercase">
								Try a role
							</p>
							<div className="flex flex-wrap gap-2">
								{EXAMPLE_ROLES.map((role) => (
									<Button
										key={role}
										type="button"
										variant="outline"
										size="sm"
										id={`role-chip-${role.replace(/\s+/g, '-').toLowerCase()}`}
										onClick={() => handleRoleSelect(role)}
										disabled={isLoading}
										className="h-auto rounded-lg border border-[#e0dbd5] px-3 py-1.5 text-sm font-medium text-[#5a4d42] transition-all duration-150 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
									>
										{role}
									</Button>
								))}
							</div>
						</div>

						{/* Loading feedback */}
						<AnimatePresence>
							{isLoading && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									exit={{ opacity: 0, height: 0 }}
									className="overflow-hidden"
								>
									<div className="flex items-center gap-3 rounded-xl bg-[#f5f1ec] px-4 py-3 text-sm text-[#6b5f54]">
										<div className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
										<span>
											Generating questions for{' '}
											<strong className="text-[#1a1a1a]">{jobTitle}</strong> —
											this takes a few seconds…
										</span>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</form>
				</motion.div>

				{/* Error state */}
				<AnimatePresence>
					{error && (
						<motion.div
							initial={{ opacity: 0, y: -8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							className="mb-6 rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-medium text-red-700"
						>
							{error.message}
						</motion.div>
					)}
				</AnimatePresence>

				{/* Results */}
				<AnimatePresence>
					{activeQuestions.length > 0 && (
						<motion.div
							ref={resultsRef}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="space-y-4"
						>
							<div className="mb-6 flex items-center justify-between">
								<div>
									<h2 className="text-xl font-bold text-[#1a1a1a]">
										Interview Questions
									</h2>
									<p className="mt-0.5 text-sm text-[#8b7d6b]">
										For{' '}
										<span className="font-semibold text-emerald-700">
											{activeTitle}
										</span>
									</p>
								</div>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={handleReset}
									id="reset-btn"
									className="flex h-auto items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#8b7d6b] transition-all duration-150 hover:bg-[#f0ece6] hover:text-[#1a1a1a]"
								>
									<RotateCcw className="h-3.5 w-3.5" />
									Start over
								</Button>
							</div>

							{activeQuestions.map((q, index) => (
								<InterviewQuestionCard key={index} question={q} index={index} />
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</main>
		</div>
	);
}
