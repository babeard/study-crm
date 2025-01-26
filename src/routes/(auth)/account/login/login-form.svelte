<script lang="ts">
	// Libraries
	import { slide } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	// Modules
	import { formSchema } from './form-schema';

	// Components
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

	// Icons
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import Sparkles from 'lucide-svelte/icons/sparkles';

	// Types
	import type { FormSchema } from './form-schema';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';

	type Props = {
		data: SuperValidated<Infer<FormSchema>>;
	};

	let { data }: Props = $props();

	const form = superForm(data, { validators: zodClient(formSchema) });

	const { form: formData, enhance, delayed, message, errors } = form;
</script>

<form action="?/email" method="POST" class="grid gap-4" use:enhance>
	<div class="grid gap-2">
		<Form.Field {form} name="email">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Email</Form.Label>
					<Input {...props} placeholder="me@example.com" bind:value={$formData.email} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<Form.Button
		disabled={$delayed || $message === 'Check your email for login link.'}
		class="flex w-full items-center space-x-3"
	>
		{#if $delayed}
			<div in:slide={{ axis: 'x' }}>
				<LoaderCircle class="animate-spin" />
			</div>
		{:else}
			<div>
				<Sparkles />
			</div>
		{/if}
		Login with email
	</Form.Button>

	{#if $message}
		<div class="text-center text-sm font-medium leading-none text-primary">
			{$message}
		</div>
	{/if}

	{#if $errors._errors?.length}
		{#each $errors._errors as err}
			<div class="leadning-none text-center text-sm font-medium text-destructive">
				{err}
			</div>
		{/each}
	{/if}
</form>
