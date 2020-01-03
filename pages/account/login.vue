<template>
	<v-row>
		<v-col cols="12">
			<h3 class="title font-weight-light text-center">Sign in</h3>
		</v-col>
		<v-col cols="12">
			<v-form v-model="loginForm">
				<v-row no-gutters>
					<v-col cols="12">
						<v-text-field
							v-model="email"
							name="login-email"
							label="E-mail"
							id="login-email"
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
							name="login-password"
							id="login-password"
							label="Password"
							outlined
							:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
							:type="showPassword ? 'text' : 'password'"
							:rules="[
								v => !!v || 'Password is required'
							]"
							@click:append="showPassword = !showPassword"
						></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-row justify="center">
							<v-btn color="primary" rounded :loading="loading" :disabled="!loginForm" @click="processLogin">sign in</v-btn>
						</v-row>
					</v-col>
					<v-col cols="12">
						<v-row justify="center" align="center" class="mt-3">
							Don't have an account?
							<v-btn small color="primary" text to="/account/register">sign up</v-btn>
						</v-row>
					</v-col>
				</v-row>
			</v-form>
		</v-col>
	</v-row>
</template>

<script>
import { emailValidation } from '~/utils/validation'
import { setUserInCookie } from '~/utils/auth'

export default {
	head() {
		return {
			title: 'Login'
		}
	},
	data() {
		return {
			email: null,
			password: null,
			loginForm: false,
			showPassword: false,
			loading: false
		}
	},
	methods: {
		emailValidation,
		async processLogin() {
			try {
				this.loading = true

				let { data } = await this.$axios.post('/login', {
					email: this.email,
					password: this.password
				})

				setUserInCookie(data.message.user, data.message.access_token, data.message.expires_in)
				this.$store.commit('user/setUser', data.message.user)
				this.$router.push('/bills')
			} catch (err) {
				console.log(err);
				
				let { response, message } = err

				if (response && response.status === 400) {
					this.$store.commit('snackbar/show', {
						text: `Invalid email or password`,
						icon: 'error'
					})
				}
				else {
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