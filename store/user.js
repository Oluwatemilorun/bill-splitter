import { getTokenFromCookie, setUserInCookie, getUserFromCookie } from '~/utils/auth'

export const state = () => ({
	user: null,
	isSignedIn: false
})

export const mutations = {
	setUser(state, user) {
		state.user = user || null;
		// setUserInCookie(user);
		state.isSignedIn = user ? true : false;
	},
}

export const actions = {
	setUser: ({ commit }) => {
		setUserInCookie(user);
		commit('setUser', user || null);
	},
	checkAuth: ({ commit }, { $axios }) => {
		let token = getTokenFromCookie();

		if (token) {
			let user = getUserFromCookie();
			$axios.defaults.headers['Authorization'] = `Bearer ${token}`;
			return commit('setUser', user);
			// return $axios.get('/list', { query: { user_account_id: user.user_account_id } })
			// 	.then(res => {
			// 		console.log(res);

			// 		commit('setUser', user);
			// 	})
			// 	.catch(err => {
			// 		let { response, message } = err;
			// 		console.log(message, response && response.data.message);

			// 		commit('setUser', null);
			// 	});
		}
	},
	logout: ({ commit }, { $axios, $router }) => { }
}