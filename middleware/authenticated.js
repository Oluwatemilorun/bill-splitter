export default function ({ store, redirect, route }) {
	if (!store.state.user.isSignedIn) {
		return redirect(`/account/login?redirect=${route.path}`);
    }
}