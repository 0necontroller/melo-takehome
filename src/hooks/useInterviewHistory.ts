'use client';

import { useState, useCallback, useEffect } from 'react';
import type { InterviewQuestion } from '@/hooks/query/interview/useInterviewQuestions';

const STORAGE_KEY = 'interview-ai-history';

export interface HistoryEntry {
	id: string;
	jobTitle: string;
	questions: InterviewQuestion[];
	createdAt: string; // ISO string
}

function loadFromStorage(): HistoryEntry[] {
	if (typeof window === 'undefined') return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
	} catch {
		return [];
	}
}

function saveToStorage(entries: HistoryEntry[]) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
	} catch {
		// storage quota exceeded or unavailable — fail silently
	}
}

export function useInterviewHistory() {
	const [history, setHistory] = useState<HistoryEntry[]>([]);

	// Hydrate from localStorage on mount (client-only)
	useEffect(() => {
		setHistory(loadFromStorage());
	}, []);

	const addEntry = useCallback(
		(jobTitle: string, questions: InterviewQuestion[]): HistoryEntry => {
			const entry: HistoryEntry = {
				id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
				jobTitle,
				questions,
				createdAt: new Date().toISOString()
			};
			setHistory((prev) => {
				const updated = [entry, ...prev];
				saveToStorage(updated);
				return updated;
			});
			return entry;
		},
		[]
	);

	const removeEntry = useCallback((id: string) => {
		setHistory((prev) => {
			const updated = prev.filter((e) => e.id !== id);
			saveToStorage(updated);
			return updated;
		});
	}, []);

	const clearAll = useCallback(() => {
		setHistory([]);
		saveToStorage([]);
	}, []);

	return { history, addEntry, removeEntry, clearAll };
}
