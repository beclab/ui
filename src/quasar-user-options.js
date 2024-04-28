
import './styles/quasar.scss'
import './styles/notify.scss';
import iconSet from 'quasar/icon-set/material-symbols-rounded.js';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css';

import { Notify } from 'quasar'

// // To be used on app.use(Quasar, { ... })
export default {
	config: {
		iconSet,
	},
	plugins: {
		Notify
	},
};
