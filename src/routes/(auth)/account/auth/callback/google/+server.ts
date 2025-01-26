// Libraries and modules
import { redirect, type RequestHandler } from '@sveltejs/kit';

/**
 * Called to complete the user signing with Google
 * @param event
 */
export const GET: RequestHandler = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;

	// Retrieves the unique value (code) used in the sign in process as well as
	// the redirect route.
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/';

	if (code) {
		const supabaseClient = supabase;
		// const supabaseServer = supabaseServerClient;

		// Checks that the code is valid (PKCE - proof key for exchange)
		const codeResult = await supabaseClient.auth.exchangeCodeForSession(code);
		if (codeResult.error) {
			throw redirect(307, '/auth/auth-code-error'); // TODO
		}

		// There should be a session created at this point which contains the user
		// metadata from Google
		const session = await event.locals.safeGetSession();
		if (session.user == null) {
			throw redirect(307, '/auth/session-not-found'); // TODO
		}

		// Success, reroute the user to the desired location
		throw redirect(307, `/${next.slice(1)}`);
	}

	throw redirect(307, '/errors?error=Failure with Google auth server'); // TODO
};
