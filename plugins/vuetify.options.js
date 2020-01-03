import colors from 'vuetify/es5/util/colors';
import "@mdi/font/css/materialdesignicons.min.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";

const theme = {
	dark: true,
	themes: {
		dark: {
			secondary: '#CF1F71',
			primary: '#3C9DB3',
			tertiary: colors.teal.darken4,
			accent: colors.brown.darken1
		}
	}
}

export default {
	// breakpoint: {},
	icons: { iconfont: 'mdi' },
	theme
}