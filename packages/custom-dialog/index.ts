import { App } from 'vue';

import BtCustomDialog from './src/IndexPage.vue';

export default (app: App) => {
	app.component(BtCustomDialog.name, BtCustomDialog);
};
