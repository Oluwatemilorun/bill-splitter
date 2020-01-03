<template>
	<v-row>
		<v-col cols="12">
			<h3 class="px-3 text-center title font-weight-light">Welcome to Bill Splitter</h3>
		</v-col>
		<v-col cols="12">
			<v-row justify="center">
				<img src="~/assets/img/bill.svg" alt="" width="70%" height="auto">
			</v-row>
		</v-col>
		<v-col cols="12">
			<p class="text-center">
				Easily split your bills amongst your friends and get the party going.
			</p>
		</v-col>
		<v-col cols="12">
			<v-row justify="center">
				<v-btn color="primary" rounded to="/account/register">get started</v-btn>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
export default {
	async asyncData({ store, redirect }) {
		try {
			if (store.state.user.isSignedIn) return redirect('/bills')
			else return {}
		} catch (e) {
			console.log(e)
		}
	},
	head() {
		return {
			title: 'Welcome'
		}
	}
}
</script>
