'use client';

import { IconBrandGoogle } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/query/auth/useAuth';
import { cn } from '@/lib/utils';
import type { LoginRequest } from '@/types/api';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'form'>) {
	const { login } = useAuth();
	const [formState, setFormState] = useState<LoginRequest>({
		email: '',
		password: ''
	});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (field: keyof LoginRequest, value: string) => {
		setFormState((current) => ({
			...current,
			[field]: value
		}));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrorMessage(null);
		setIsSubmitting(true);
		try {
			await login(formState);
		} catch (error: any) {
			const message =
				error?.response?.data?.message || 'Login failed. Please try again.';
			setErrorMessage(message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			className={cn('flex flex-col gap-6', className)}
			onSubmit={handleSubmit}
			{...props}
		>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Login to your account</h1>
				<p className="text-muted-foreground text-sm text-balance">
					Enter your email below to login to your account
				</p>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						placeholder="m@example.com"
						required
						value={formState.email}
						onChange={(event) => handleChange('email', event.target.value)}
					/>
				</div>
				<div className="grid gap-2">
					<div className="flex items-center">
						<Label htmlFor="password">Password</Label>
						<Link
							href="/forgot-password"
							className="ml-auto text-sm underline-offset-4 hover:underline"
						>
							Forgot your password?
						</Link>
					</div>
					<Input
						id="password"
						type="password"
						required
						value={formState.password}
						onChange={(event) => handleChange('password', event.target.value)}
					/>
				</div>
				{errorMessage ? (
					<p className="text-sm text-destructive" aria-live="polite">
						{errorMessage}
					</p>
				) : null}
				<Button type="submit" className="w-full" disabled={isSubmitting}>
					{isSubmitting ? 'Logging in...' : 'Login'}
				</Button>
				<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
					<span className="bg-background text-muted-foreground relative z-10 px-2">
						Or continue with
					</span>
				</div>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="outline" className="w-full">
							<IconBrandGoogle className="mr-2" aria-hidden="true" />
							<span>Login with Google</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Coming soon!</p>
					</TooltipContent>
				</Tooltip>
			</div>
			<div className="text-center text-sm">
				Don&apos;t have an account?{' '}
				<Link href="/sign-up" className="underline underline-offset-4">
					Sign up
				</Link>
			</div>
		</form>
	);
}
