export interface InterviewQuestion {
	question: string;
	purpose: string;
	lookFor: string[];
}

export interface GenerateQuestionsResponse {
	questions: InterviewQuestion[];
}

export const generateInterviewQuestions = async (
	jobTitle: string
): Promise<GenerateQuestionsResponse> => {
	const response = await fetch('/api/v1/interview-questions', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ jobTitle })
	});

	if (!response.ok) {
		const body = await response.json().catch(() => ({}));
		throw new Error(body.error || 'Failed to generate interview questions');
	}

	return response.json();
};
