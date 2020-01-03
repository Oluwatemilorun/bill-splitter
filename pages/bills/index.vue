<template>
	<v-row>
		
	</v-row>
</template>

<script>
export default {
	middleware: 'authenticated',
	async asyncData({ store, error }) {
		try {
			store.commit('toggleFab', true);
		} catch (e) {
			
		}
	},
	beforeRouteLeave(to, from, next) {
		this.$store.commit('toggleFab', false);
		next()
	}
}
</script>

<style>

</style>