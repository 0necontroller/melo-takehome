'use client';

import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '../keys';
import { generateInterviewQuestions } from './service';
import type { GenerateQuestionsResponse } from './service';

/**
 * Mutation hook for generating interview questions.
 *
 * Uses useMutation (not useQuery) because generation is always triggered
 * by an explicit user action (form submit), not on mount. Results are
 * cached per job title via the `mutationKey` for deduplication purposes.
 */
export function useGenerateInterviewQuestions() {
	return useMutation<GenerateQuestionsResponse, Error, string>({
		mutationKey: ['interview', 'generate'],
		mutationFn: (jobTitle: string) => generateInterviewQuestions(jobTitle),
		// queryKey-style caching: if we later want to seed the query cache,
		// we can do so via onSuccess with queryClient.setQueryData
		onError: (error) => {
			console.error('Failed to generate interview questions:', error.message);
		}
	});
}

// Re-export types for convenience so consumers don't need to import from service
export type { InterviewQuestion, GenerateQuestionsResponse } from './service';
