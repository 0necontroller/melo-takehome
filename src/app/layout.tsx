import './globals.css';
import { DM_Sans, Figtree, Merriweather } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { QueryProvider } from '@/hooks/query/query-provider';
import { Toaster } from 'sonner';
import {
	IconAlertTriangle,
	IconCheck,
	IconInfoCircle,
	IconLoader2,
	IconX
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';

const merriweatherHeading = Merriweather({subsets:['latin'],variable:'--font-heading'});

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

const dmSans = DM_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-dm-sans',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
	title: {
		default: 'InterviewAI — Generate Interview Questions with Gemini',
		template: '%s | InterviewAI'
	},
	description:
		'InterviewAI generates tailored, role-specific interview questions and evaluation criteria in seconds — powered by Google Gemini Flash.',
	metadataBase: new URL('https://interviewai.app'),
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: '/',
		siteName: 'InterviewAI',
		title: 'InterviewAI — Generate Interview Questions with Gemini',
		description:
			'Get 3 thoughtful, role-specific interview questions with detailed evaluation criteria — powered by Google Gemini Flash.',
		images: '/opengraph-image.png'
	},
	twitter: {
		card: 'summary_large_image',
		title: 'InterviewAI — Generate Interview Questions with Gemini',
		description:
			'Get 3 thoughtful, role-specific interview questions with detailed evaluation criteria — powered by Google Gemini Flash.'
	},
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			'index': true,
			'follow': true,
			'noimageindex': false,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	},
	keywords: [
		'interview questions',
		'AI interview prep',
		'hiring manager tools',
		'interview generator',
		'Gemini AI',
		'HR tools',
		'competency-based interviewing',
		'behavioral interview questions',
		'recruiting tools'
	],
	category: 'Productivity'
};
export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn(
        				'font-sans'
        			, "font-sans", figtree.variable, merriweatherHeading.variable)}
		>
			<body className={dmSans.className}>
				<QueryProvider>
					<TooltipProvider>{children}</TooltipProvider>
				</QueryProvider>
				<Toaster
					position="top-center"
					richColors
					icons={{
						success: <IconCheck className="text-primary size-5" />,
						error: <IconX className="text-primary size-5" />,
						info: <IconInfoCircle className="text-primary size-5" />,
						warning: <IconAlertTriangle className="text-primary size-5" />,
						loading: (
							<IconLoader2 className="text-primary size-5 animate-spin" />
						)
					}}
					toastOptions={{
						className: '',
						duration: 2000
					}}
				/>
			</body>
		</html>
	);
}
