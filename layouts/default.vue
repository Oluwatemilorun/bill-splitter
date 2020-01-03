<template>
	<v-app>
		<v-container fill-height class="pa-0">
			<v-row justify="center" align="center" class="" style="height: 100%">
				<v-card
					:width="$vuetify.breakpoint.smAndDown ? '100vw' : '350px'"
					:height="$vuetify.breakpoint.smAndDown ? '100vh' : 'auto'"
					class="overflow-hidden"
				>
					<Toolbar />

					<v-card-text id="content" class="overflow-y-auto" style="height: 85vh; padding-top: 230px">
						<nuxt />
					</v-card-text>
				</v-card>
			</v-row>
		</v-container>

		<Snackbar />
	</v-app>
</template>

<script>
import Toolbar from '~/components/Toolbar'
import Snackbar from '~/components/Snackbar'

export default {
	components: { Toolbar, Snackbar }
}
</script>
