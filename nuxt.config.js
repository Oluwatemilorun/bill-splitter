export default {
	mode: 'spa',
	head: {
		titleTemplate: '%s - Bill Splitter',
		title: 'Welcome',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},
	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#fff' },
	css: [
	],
	/**
	 * Router configs
	 */
	router: {
		middleware: ['check-auth']
	},
	plugins: [
	],
	buildModules: [
		'@nuxtjs/vuetify',
	],
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'@nuxtjs/pwa',
		// Doc: https://github.com/nuxt-community/dotenv-module
		'@nuxtjs/dotenv',
	],
	/*
	** Axios module configuration
	** See https://axios.nuxtjs.org/options
	*/
	axios: {
		baseURL: 'http://billsplitapi.herokuapp.com/bills'
	},
	/*
	** vuetify module configuration
	** https://github.com/nuxt-community/vuetify-module
	*/
	vuetify: {
		customVariables: ['~/assets/styles/variables.scss'],
		defaultAssets: false,
		optionsPath: '~/plugins/vuetify.options.js'
	},
	build: {
		/*
		** You can extend webpack config here
		*/
		extend(config, ctx) {
		}
	}
}
