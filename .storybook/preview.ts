import { Preview, setup } from "@storybook/vue3";
import type { App, Plugin } from "vue";
import { Quasar } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";
const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		}
	}
};

setup((app: App) => {
	app.use(Quasar, {
		plugins: {} // import Quasar plugins and add here
	});
});
export default preview;
