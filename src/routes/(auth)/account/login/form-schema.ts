import { z } from 'zod';

export const formSchema = z.object({
	email: z.string().email({ message: 'Email is required' })
});

export type FormSchema = typeof formSchema;
