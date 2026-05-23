'use client';

import { useState, useRef } from 'react';
import {
	Send,
	RotateCcw,
	CheckCircle2,
	Lightbulb,
	ChevronDown,
	Sparkles
} from 'lucide-react';
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { useGenerateInterviewQuestions } from '@/hooks/query/interview/useInterviewQuestions';
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
	const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>(
		{}
	);
	const resultsRef = useRef<HTMLDivElement>(null);

	const {
		mutate: generateQuestions,
		data,
		isPending: isLoading,
		error,
		reset
	} = useGenerateInterviewQuestions();

	const questions: InterviewQuestion[] = data?.questions ?? [];

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!jobTitle.trim() || isLoading) return;

		setExpandedCards({});

		generateQuestions(jobTitle.trim(), {
			onSuccess: (result) => {
				// Expand all cards by default
				const expanded: Record<number, boolean> = {};
				result.questions.forEach((_, i) => {
					expanded[i] = true;
				});
				setExpandedCards(expanded);

				setTimeout(() => {
					resultsRef.current?.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}, 100);
			}
		});
	};

	const handleRoleClick = (role: string) => {
		setJobTitle(role);
	};

	const handleReset = () => {
		reset();
		setJobTitle('');
		setExpandedCards({});
	};

	const toggleCard = (index: number) => {
		setExpandedCards((prev) => ({ ...prev, [index]: !prev[index] }));
	};

	return (
		<div className="min-h-screen bg-[#fafaf8]">
			<DashboardNavbar />

			<main className="mx-auto max-w-4xl px-6 py-16">
				{/* Hero */}
				<div className="mb-14 text-center">
					<h1 className="mb-4 text-4xl leading-tight font-bold tracking-tight text-[#1a1a1a] sm:text-5xl">
						Generate thoughtful
						<br />
						<span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
							interview questions
						</span>
					</h1>
					<p className="mx-auto max-w-xl text-lg leading-relaxed text-[#6b5f54]">
						Enter any job title and get 3 role-specific interview questions with
						detailed evaluation criteria — powered by Google Gemini Flash.
					</p>
				</div>

				{/* Input Form */}
				<div className="mb-6 rounded-2xl border border-[#e8e4df] bg-white p-8 shadow-sm">
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
								<button
									type="submit"
									disabled={!jobTitle.trim() || isLoading}
									id="generate-questions-btn"
									className="group absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-emerald-500 shadow-sm transition-all duration-200 hover:bg-emerald-600 hover:shadow disabled:cursor-not-allowed disabled:bg-[#d9d3cc]"
								>
									{isLoading ? (
										<div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
									) : (
										<Send className="h-4 w-4 text-white transition-transform group-hover:translate-x-0.5" />
									)}
								</button>
							</div>
						</div>

						{/* Quick role chips */}
						<div>
							<p className="mb-2.5 text-xs font-medium tracking-wider text-[#a09183] uppercase">
								Try a role
							</p>
							<div className="flex flex-wrap gap-2">
								{EXAMPLE_ROLES.map((role) => (
									<button
										key={role}
										type="button"
										id={`role-chip-${role.replace(/\s+/g, '-').toLowerCase()}`}
										onClick={() => handleRoleClick(role)}
										disabled={isLoading}
										className="rounded-lg border border-[#e0dbd5] px-3 py-1.5 text-sm font-medium text-[#5a4d42] transition-all duration-150 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
									>
										{role}
									</button>
								))}
							</div>
						</div>

						{/* Loading feedback */}
						{isLoading && (
							<div className="flex items-center gap-3 rounded-xl bg-[#f5f1ec] px-4 py-3 text-sm text-[#6b5f54]">
								<div className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
								<span>
									Generating questions for{' '}
									<strong className="text-[#1a1a1a]">{jobTitle}</strong> — this
									takes a few seconds…
								</span>
							</div>
						)}
					</form>
				</div>

				{/* Error state */}
				{error && (
					<div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
						{error.message}
					</div>
				)}

				{/* Results */}
				{questions.length > 0 && (
					<div ref={resultsRef} className="space-y-4">
						<div className="mb-6 flex items-center justify-between">
							<div>
								<h2 className="text-xl font-bold text-[#1a1a1a]">
									Interview Questions
								</h2>
								<p className="mt-0.5 text-sm text-[#8b7d6b]">
									For{' '}
									<span className="font-semibold text-emerald-700">
										{jobTitle}
									</span>
								</p>
							</div>
							<button
								type="button"
								onClick={handleReset}
								id="reset-btn"
								className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#8b7d6b] transition-all duration-150 hover:bg-[#f0ece6] hover:text-[#1a1a1a]"
							>
								<RotateCcw className="h-3.5 w-3.5" />
								Start over
							</button>
						</div>

						{questions.map((q, index) => (
							<div
								key={index}
								id={`question-card-${index + 1}`}
								className="overflow-hidden rounded-2xl border border-[#e8e4df] bg-white shadow-sm"
								style={{
									animationDelay: `${index * 100}ms`,
									animation: 'fadeSlideIn 0.4s ease forwards'
								}}
							>
								{/* Question header — acts as expand toggle */}
								<button
									type="button"
									onClick={() => toggleCard(index)}
									className="flex w-full items-start gap-4 px-7 py-6 text-left transition-colors duration-150 hover:bg-[#fafaf8]"
								>
									<div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-emerald-500 to-teal-600 shadow-sm">
										<span className="text-xs font-bold text-white">
											{index + 1}
										</span>
									</div>
									<div className="min-w-0 flex-1">
										<p className="text-[15px] leading-snug font-semibold text-[#1a1a1a]">
											{q.question}
										</p>
										{q.purpose && (
											<p className="mt-1.5 flex items-center gap-1.5 text-sm text-[#8b7d6b]">
												<Lightbulb className="h-3.5 w-3.5 shrink-0 text-amber-400" />
												{q.purpose}
											</p>
										)}
									</div>
									<ChevronDown
										className={`mt-1 h-4 w-4 shrink-0 text-[#a09183] transition-transform duration-200 ${
											expandedCards[index] ? 'rotate-180' : ''
										}`}
									/>
								</button>

								{/* Evaluation criteria */}
								{expandedCards[index] && (
									<div className="border-t border-[#f0ece6] px-7 pb-6">
										<p className="mt-5 mb-3 text-xs font-semibold tracking-wider text-[#a09183] uppercase">
											What to look for
										</p>
										<ul className="space-y-2.5">
											{q.lookFor.map((item, i) => (
												<li key={i} className="flex items-start gap-3">
													<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
													<span className="text-sm leading-relaxed text-[#4a3f36]">
														{item}
													</span>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						))}

						<p className="mt-6 pb-4 text-center text-xs text-[#b5a99a]">
							Generated with Google Gemini Flash · Results may vary
						</p>
					</div>
				)}
			</main>

			<style jsx>{`
				@keyframes fadeSlideIn {
					from {
						opacity: 0;
						transform: translateY(12px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</div>
	);
}
