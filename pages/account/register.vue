<template>
	<v-row>
		<v-col cols="12">
			<h3 class="title font-weight-light text-center">Sign up</h3>
		</v-col>
		<v-col cols="12">
			<v-form v-model="regForm">
				<v-row no-gutters>
					<v-col cols="12">
						<v-text-field
							v-model="username"
							name="reg-username"
							label="Username"
							id="reg-username"
							outlined
							:rules="[
								v => !!v || 'Username is required',
								v => !!v && usernameValidation(v) || 'Username can only contain Alphanumeric characters'
							]"
						></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field
							v-model="email"
							name="reg-email"
							label="E-mail"
							id="reg-email"
							outlined
							:rules="[
								v => !!v || 'Email is required',
								v => !!v && emailValidation(v) || 'Email is invalid'
							]"
						></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field
							v-model="password"
							name="reg-password"
							id="reg-password"
							label="Password"
							outlined
							:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
							:type="showPassword ? 'text' : 'password'"
							:rules="[
								v => !!v || 'Password is required',
								v => !!v && v.length >= 8 || 'Password must be more than 8 characters',
							]"
							@click:append="showPassword = !showPassword"
						></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-row justify="center">
							<v-btn
								color="primary"
								rounded
								:loading="loading"
								:disabled="!regForm"
								@click="processSignUp"
							>sign up</v-btn>
						</v-row>
					</v-col>
					<v-col cols="12">
						<v-row justify="center" align="center" class="mt-3">
							Already own an account
							<v-btn small color="primary" text to="/account/login">sign in</v-btn>
						</v-row>
					</v-col>
				</v-row>
			</v-form>
		</v-col>
	</v-row>
</template>

<script>
import { emailValidation, usernameValidation } from '~/utils/validation'
import { setUserInCookie } from '~/utils/auth'

export default {
	head() {
		return {
			title: 'Create account'
		}
	},
	data() {
		return {
			username: null,
			email: null,
			password: null,
			showPassword: false,
			regForm: false,
			loading: false
		}
	},
	methods: {
		emailValidation,
		usernameValidation,
		async processSignUp() {
			try {
				this.loading = true

				await this.$axios.post('/signup', {
					username: this.username,
					email: this.email,
					password: this.password
				})

				let { data } = await this.$axios.post('/login', {
					email: this.email,
					password: this.password
				})

				setUserInCookie(
					data.message.user,
					data.message.access_token,
					data.message.expires_in
				)
				
				this.$store.dispatch('user/setUser', data.message.user)
				this.$router.replace('/bills')
			} catch (err) {
				console.log(err)
				let { response, message } = err

				if (response && response.status === 400) {
					this.$store.commit('snackbar/show', {
						text: response.message,
						icon: 'error'
					})
				} else if (response && response.status === 409) {
					this.$store.commit('snackbar/show', {
						text: response.data.payload,
						icon: 'error'
					})
				} else {
					this.$store.commit('snackbar/show', {
						text: 'Network error. Try again later.',
						icon: 'error'
					})
				}
			} finally {
				this.loading = false
			}
		}
	}
}
</script>

<style>
</style>