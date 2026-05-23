import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, Output } from 'ai';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { ENV } from '@/lib/environments';

const interviewQuestionsSchema = z.object({
	questions: z
		.array(
			z.object({
				question: z
					.string()
					.describe('A thoughtful, role-specific interview question'),
				purpose: z
					.string()
					.describe('Why this question is important for the role'),
				lookFor: z
					.array(z.string())
					.describe(
						'Specific things to look for and evaluate in the candidate response'
					)
			})
		)
		.length(3)
		.describe('Exactly 3 interview questions for the role')
});

export async function POST(request: Request) {
	try {
		const { jobTitle } = await request.json();

		if (!jobTitle || typeof jobTitle !== 'string') {
			return NextResponse.json(
				{ error: 'Job title is required' },
				{ status: 400 }
			);
		}

		const google = createGoogleGenerativeAI({
			apiKey: ENV.GEMINI_API_KEY
		});

		const { output } = await generateText({
			model: google('gemini-3.5-flash'),
			output: Output.object({
				name: 'InterviewQuestions',
				description: 'Thoughtful interview questions with evaluation criteria',
				schema: interviewQuestionsSchema
			}),
			prompt: `You are an expert HR professional and hiring manager with deep expertise in behavioral and competency-based interviewing.

Generate exactly 3 thoughtful, insightful interview questions for a "${jobTitle}" position.

Requirements:
- Questions should be role-specific and reveal genuine competencies needed for the role
- Mix behavioral, situational, and skill-based questions
- Each question should have 4-6 concrete evaluation criteria that interviewers should look for
- Criteria should be specific, observable behaviors or qualities — not generic platitudes
- Focus on what truly differentiates high performers in this role

Respond with exactly 3 questions.`
		});

		return NextResponse.json({ questions: output.questions });
	} catch (error: any) {
		console.error('Error generating interview questions:', error);

		// Detect Gemini quota / rate-limit errors and surface them clearly
		const statusCode: number | undefined =
			error?.statusCode ?? error?.response?.status;

		if (statusCode === 429) {
			const retryDelay: number | undefined = error?.data?.error?.details?.find(
				(d: any) => d['@type']?.endsWith('RetryInfo')
			)?.retryDelay;

			const retryMsg = retryDelay
				? ` Please wait ${retryDelay} and try again.`
				: ' Please wait a moment and try again.';

			return NextResponse.json(
				{
					error: `Gemini API rate limit reached.${retryMsg}`
				},
				{ status: 429 }
			);
		}

		return NextResponse.json(
			{ error: 'Failed to generate interview questions. Please try again.' },
			{ status: 500 }
		);
	}
}
