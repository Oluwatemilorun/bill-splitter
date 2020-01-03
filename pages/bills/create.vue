<template>
	<v-row>
		<v-col cols="12">
			<v-dialog-transition>
				<v-card color="primary">
					<v-row align="center" class="mx-3 py-2">
						<v-col cols="12">
							<v-text-field
								v-model="title"
								flat label="Title"
								hide-details
								background-color="primary"
								color="accent"
								class="pa-0 title"
							></v-text-field>
						</v-col>
						<v-col>
							<div class="overline">Total</div>
							<div class="display-1">
								<v-text-field
									v-model="total"
									solo flat
									placeholder="oo.oo"
									prepend-inner-icon="mdi-currency-ngn"
									autofocus
									hide-details
									background-color="primary"
									color="accent"
									class="pa-0 display-1"
									@input="calcBill"
								></v-text-field>
							</div>
						</v-col>
						<v-col cols="auto" style="min-width: 130px">
							<!-- <v-row dense>
								<v-col cols="6">Bills</v-col>
								<v-col cols="6">6</v-col>
							</v-row> -->
							<v-row dense>
								<v-col cols="6">Friends</v-col>
								<v-col cols="6" class="text-right">{{ friends.length }}</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-card>
			</v-dialog-transition>
		</v-col>
		<v-col cols="12">
			<v-textarea
				v-model="description"
				rows="2"
				label="Description"
				counter="130"
				class="caption"
			></v-textarea>
		</v-col>
		<v-col cols="12">
			<v-row no-gutters align="center" justify="space-between">
				<div class="overline">Friends</div>
				<v-btn x-small rounded color="primary" @click="addFriendDialog = true"><v-icon left>mdi-plus</v-icon> add new</v-btn>
			</v-row>
		</v-col>
		<v-col cols="12">
			<v-slide-y-transition>
				<v-list dense>
					<v-list-item v-for="friend in friends" :key="friend.email" class="px-0">
						<v-list-item-avatar color="primary">
							<span class="text-uppercase">{{userInitials(friend.username)}}</span>
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title class="text-capitalize">{{ friend.username }}</v-list-item-title>
							<v-list-item-subtitle>{{ friend.email }}</v-list-item-subtitle>
						</v-list-item-content>
						<v-list-item-action-text class="secondary--text">
							<v-icon size="12" color="secondary">mdi-currency-ngn</v-icon>
							<span>{{ friend.amount }}</span>
						</v-list-item-action-text>
						<v-list-item-action>
							<v-btn icon small color="primary" @click="removeFriend(friend.email)">
								<v-icon>mdi-close</v-icon>
							</v-btn>
						</v-list-item-action>
					</v-list-item>
				</v-list>
			</v-slide-y-transition>
		</v-col>
		<v-col cols="12">
			<v-row justify="center">
				<v-btn color="primary" rounded :loading="loading" @click="processBill">save & send</v-btn>
			</v-row>
		</v-col>

		<v-dialog
			v-model="addFriendDialog"
			max-width="400px"
			transition="dialog-transition"
		>
			<v-card>
				<v-card-title >
					<div class="caption">Add friend</div>
				</v-card-title>
				<v-card-text>
					<v-form v-model="addFriendForm">
						<v-row no-gutters>
							<v-col cols="12" class="mb-2">
								<v-text-field
									v-model="addFriendUsername"
									name="add-friend-username"
									id="add-friend-username"
									label="Username"
									outlined dense
									:rules="[
										v => !!v || 'Username is required',
										v => !!v && usernameValidation(v) || 'Username can only contain Alphanumeric characters'
									]"
								></v-text-field>
							</v-col>
							<v-col cols="12" class="mb-2">
								<v-text-field
									v-model="addFriendEmail"
									name="add-friend-email"
									id="add-friend-email"
									label="E-mail"
									outlined dense
									:rules="[
										v => !!v || 'Email is required',
										v => !!v && emailValidation(v) || 'Email is invalid'
									]"
								></v-text-field>
							</v-col>
							<v-col cols="12" class="mb-2">
								<v-row justify="center">
									<v-btn rounded color="primary" :disabled="!addFriendForm" @click="addFriend">add friend</v-btn>
								</v-row>
							</v-col>
						</v-row>
					</v-form>
				</v-card-text>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import { emailValidation, usernameValidation } from '~/utils/validation'

export default {
	head() {
		return {
			title: 'Create new bill'
		}
	},
	data() {
		return {
			title: 'My New Bill',
			description: null,
			total: 0,
			addFriendForm: false,
			addFriendDialog: false,
			addFriendUsername: null,
			addFriendEmail: null,
			friends: [],
			loading: false
		}
	},
	methods: {
		emailValidation, usernameValidation,
		addFriend() {
			let friendCheck = this.friends.filter(f => f.email === this.addFriendEmail || f.username === this.addFriendUsername)
			if (friendCheck.length >= 1) {
				return this.$store.commit('snackbar/show', {
					text: `Friend already exist`,
					icon: 'warning'
				})
			}

			const data = {
				username: this.addFriendUsername,
				email: this.addFriendEmail
			}

			this.friends.push(data)
			this.calcBill()

			this.addFriendDialog = false
			this.addFriendUsername = null
			this.addFriendEmail = null
		},
		removeFriend(email) {
			this.friends = this.friends.filter(f => f.email !== email)
		},
		calcBill() {
			this.friends = this.friends.map(f => {
				return {
					username: f.username,
					email: f.email,
					amount: parseFloat(this.total) / this.friends.length
				}
			})
		},
		userInitials(name) {
			if (!!!name) return
			
			let names = name.split(/ /g)
			let initials = ''
			
			names.forEach((n, i) => {
				if (i > 1) return
				initials += n.charAt(0)
			})

			return initials
		},
		async processBill() {
			try {
				this.loading = true;

				if (
					!this.title ||
					!this.description ||
					!this.friends.length === 0
				) {
					return this.$store.commit('snackbar/show', {
						text: `Some fields are missing`,
						icon: 'warning'
					})
				}

				let data = {
					user_account_id: this.$store.state.user.user.user_account_id,
					title: this.title,
					description: this.description,
					recipients: this.friends
				}

				await this.$axios.post('/create', data)

				this.$store.commit('snackbar/show', {
					text: `Bill saved successfully`,
					icon: 'success'
				})

				this.$router.replace('/bills')
			} catch (err) {
				console.log(err)

				this.$store.commit('snackbar/show', {
					text: `Error processing bill. Try again later`,
					icon: 'error'
				})
			} finally {
				this.loading = false
			}
		}
	}
}
</script>

<style>
.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot, .v-text-field.v-text-field--enclosed .v-text-field__details {
	padding: 0;
}
</style>