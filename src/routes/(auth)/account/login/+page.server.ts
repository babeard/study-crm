// Libraries
import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate, message, setError } from 'sveltekit-superforms';

// Types
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Utils
import { formSchema } from './form-schema';

// Variables
import { PUBLIC_ADDRESS } from '$env/static/public';
import { PRIVATE_SUPABASE_OAUTH_REDIRECT } from '$env/static/private';

/**
 * Server load on login checks if user is already logged in.
 */
export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.safeGetSession();
	if (session.user) {
		redirect(307, '/app');
	}

	return {
		form: await superValidate(zod(formSchema))
	};
};

/**
 * Handles the login actions for email and Google
 */
export const actions: Actions = {
	/**
	 * Registers or logs in the user via email.
	 *
	 * Note: This is limited with the free Supabase plan. Check how many email
	 * users are allowed per hour. Last I checked it was three new accounts.
	 *
	 * @param request
	 * @param locals
	 * @returns
	 */
	email: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { error } = await event.locals.supabase.auth.signInWithOtp({
			email: form.data.email,
			options: {
				shouldCreateUser: true,
				emailRedirectTo: `${PUBLIC_ADDRESS}/app`
			}
		});

		// If there's an error send that back to the user to be displayed on the
		// Login page.
		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				form.errors.email = ['Invalid email or password'];
				return fail(400, {
					form
					// error: 'Invalid email or password'
				});
			}

			return setError(form, '', 'Something went wrong. Please try again later.');
		}

		return message(form, 'Check your email for login link.');
	},

	/**
	 * Registers via Google
	 *
	 * Note: This should be done with the public Supabase client attached to
	 * locals in hooks.server.ts.
	 *
	 * @param param0
	 * @returns
	 */
	google: async ({ locals }) => {
		console.log({ locals });
		const { data, error } = await locals.supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				scopes: 'https://www.googleapis.com/auth/userinfo.email',
				redirectTo: `${PUBLIC_ADDRESS}/${PRIVATE_SUPABASE_OAUTH_REDIRECT}/google`
			}
		});

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Invalid credentials'
				});
			}
			return fail(500, {
				message: 'Server error. Try again later.'
			});
		}

		throw redirect(307, data.url);
	}
};
