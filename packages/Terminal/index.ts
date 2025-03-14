import { App } from "vue";
import BtTerminal from "./src/index.vue";

export default (app: App) => {
	app.component('BtTerminal', BtTerminal);
};
