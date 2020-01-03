import Cookie from 'js-cookie';

export const setUserInCookie = (user, token, exp) => {
	Cookie.set('bs_auth_token', token, { expires: exp || 2 });
	Cookie.set('bs_user', user ? JSON.stringify(user) : null, { expires: exp || 2 });
}

export const getTokenFromCookie = () => {
	// let token = window.localStorage && window.localStorage.getItem('access_token');
	const token = Cookie.get('bs_auth_token');
	return token;
}

export const getUserFromCookie = () => {
	const user = Cookie.get('bs_user') ? JSON.parse(Cookie.get('bs_user')) : null
	if (user) return user
	else return
}