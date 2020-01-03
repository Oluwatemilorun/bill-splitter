export const state = () => ({
	showFab: false,
	showSaveFab: false
});

export const mutations = {
	toggleFab(state, toggle) {
		state.showFab = toggle
	},
	toggleSaveFab(state, toggle) {
		state.showSaveFab = toggle
	}
}