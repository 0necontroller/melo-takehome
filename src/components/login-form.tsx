import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { IconBrandGoogle } from '@tabler/icons-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'form'>) {
	return (
		<form className={cn('flex flex-col gap-6', className)} {...props}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Login to your account</h1>
				<p className="text-muted-foreground text-sm text-balance">
					Enter your email below to login to your account
				</p>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" required />
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
					<Input id="password" type="password" required />
				</div>
				<Button type="submit" className="w-full">
					Login
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
				<Link href="#" className="underline underline-offset-4">
					Sign up
				</Link>
			</div>
		</form>
	);
}
