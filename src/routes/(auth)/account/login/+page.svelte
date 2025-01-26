<script lang="ts">
	// Libraries and modules
	import type { FormEventHandler } from 'svelte/elements';
	import { applyAction } from '$app/forms';
	import { deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	// Components
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import LoginForm from './login-form.svelte';

	// Icons
	import Google from '$lib/components/svgs/google.svelte';
	// import Github from '$lib/components/svgs/github.svelte';

	// Types
	import type { PageData } from './$types';

	type Props = { data: PageData };
	let { data }: Props = $props();
</script>

<Card.Root class="mx-auto max-w-sm md:mt-20">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email below to login or create account</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-4">
			<LoginForm data={data.form} />

			<div>
				<div class="relative mt-6">
					<div class="absolute inset-0 flex items-center" aria-hidden="true">
						<div class="w-full border-t border-gray-200"></div>
					</div>
					<div class="relative flex justify-center text-sm/6 font-medium">
						<span class="bg-white px-6 text-gray-900">Or continue with</span>
					</div>
				</div>

				<div class="mt-6 grid grid-cols-1 gap-4">
					<form action="?/google" class="form-control" method="POST">
						<Button
							type="submit"
							variant="outline"
							class="flex w-full items-center justify-center gap-3"
						>
							<Google />
							<span class="text-sm/6 font-semibold">Google</span>
						</Button>
					</form>

					<!-- <form action="?/github" class="form-control" method="POST">
						<Button
							type="submit"
							variant="outline"
							class="flex w-full items-center justify-center gap-3"
						>
							<Github />
							<span class="text-sm/6 font-semibold">Github</span>
						</Button>
					</form> -->
				</div>
			</div>
		</div>
		<!-- <div class="mt-10 text-center text-sm">
			Don't have an account?
			<a href="/account/register" class="underline">Sign up</a>
		</div> -->
	</Card.Content>
</Card.Root>
