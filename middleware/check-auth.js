export default async ({ $axios, store, error }) => {
	try {
		// if (process.server && !req) return;

		if (process.client) {
			// console.log(window)
			await store.dispatch('user/checkAuth', {$axios});
		}
		else return;
	} catch (e) {
		console.log(e);

		let { response, message } = e;
		if (response && response.status == 401 || response && response.status == 403) return;
		else error({ statusCode: response ? response.status : 503, message: response ? response.statusText : message });
	}
}