'use client';

import { useMutation } from '@tanstack/react-query';
import { generateInterviewQuestions } from './service';
import type { GenerateQuestionsResponse } from './service';

/**
 * Mutation hook for generating interview questions.
 */
export function useGenerateInterviewQuestions() {
	return useMutation<GenerateQuestionsResponse, Error, string>({
		mutationKey: ['interview', 'generate'],
		mutationFn: (jobTitle: string) => generateInterviewQuestions(jobTitle),
		onError: (error) => {
			console.error('Failed to generate interview questions:', error.message);
		}
	});
}

export type { InterviewQuestion, GenerateQuestionsResponse } from './service';
