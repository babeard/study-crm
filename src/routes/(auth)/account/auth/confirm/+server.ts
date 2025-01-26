import type { EmailOtpType } from '@supabase/supabase-js';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;

	// Retrieves the PKCE code used in the sign in process
	const code = url.searchParams.get('token_hash') as string;
	const type = url.searchParams.get('type') as EmailOtpType;
	const next = url.searchParams.get('next') ?? '/';

	if (code) {
		const { error } = await supabase.auth.verifyOtp({ token_hash: code, type });

		if (error) {
			throw redirect(307, `/account/login?error=${encodeURIComponent(error.message)}`);
		}

		throw redirect(307, `/${next.slice(1)}`);
	}

	// TODO: handle this on the login page
	throw redirect(307, `/account/login?error=${encodeURIComponent('No token_hash provided')}`);
};
