<template>
	<v-card class="px-2">
		<v-row align="center">
			<v-col cols="auto">
				<v-avatar left color="primary" class="text-uppercase">{{userInitials}}</v-avatar>
			</v-col>
			<v-col cols="7">
				<div class="title">{{friend.username}}</div>
				<div class="caption">{{friend.email}}</div>
			</v-col>
			<v-col>
				<v-btn icon color="primary">
					<v-icon>mdi-delete</v-icon>
				</v-btn>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
export default {
	name: 'friend-input-card',
	props: {
		friend: {
			type: Object,
			default: {
				username: 'cwecwecwecc',
				email: 'cewc',
				amount: 0
			}
		}
	},
	computed: {
		userInitials() {
			let name = this.friend.username
			
			if (!!!name) return
			
			let names = name.split(/ /g)
			let initials = ''
			
			names.forEach((n, i) => {
				if (i > 1) return
				initials += n.charAt(0)
			})

			return initials
		}
	}
}
</script>

<style>

</style>