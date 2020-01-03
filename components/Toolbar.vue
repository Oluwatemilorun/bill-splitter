<template>
	<v-app-bar
		absolute
		color="secondary"
		extended
		shrink-on-scroll
		scroll-target="#content"
		src="https://picsum.photos/1920/1080?random"
	>
		<template v-slot:img="{ props }">
			<v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
		</template>

		<v-toolbar-title>Bill Splitter</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-chip v-if="authenticated" pill light>
			<v-avatar left color="primary" class="text-uppercase">{{userInitials}}</v-avatar>{{user.username}}
		</v-chip>

		<template v-slot:extension>
			<v-fab-transition>
				<v-btn v-show="billCreate" color="primary" dark absolute bottom left fab to="/bills/create">
					<v-icon>mdi-plus</v-icon>
				</v-btn>
			</v-fab-transition>
			<!-- <v-fab-transition>
				<v-btn v-show="billSave" color="secondary" dark absolute bottom left fab @click="processBill">
					<v-icon>mdi-send</v-icon>
				</v-btn>
			</v-fab-transition> -->
		</template>
	</v-app-bar>
</template>

<script>
export default {
	computed: {
		billCreate() {
			return this.$store.state.showFab
		},
		billSave() {
			return this.$store.state.showSaveFab
		},
		authenticated() {
			return this.$store.state.user.isSignedIn
		},
		user() {
			return this.$store.state.user.user
		},
		userInitials() {
			let name = this.user.username
			
			if (!!!name) return
			
			let names = name.split(/ /g)
			let initials = ''
			
			names.forEach((n, i) => {
				if (i > 1) return
				initials += n.charAt(0)
			})

			return initials
		}
	},
	methods: {
	}
}
</script>

<style>
</style>