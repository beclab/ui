import "../src/styles/quasar.scss";
import "../src/styles/notify.scss";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-symbols-rounded/material-symbols-rounded.css";

import { App } from "vue";
// import { Quasar, Notify, Dialog } from "quasar";
import BtButton from "./button";
import BtLoading from "./loading";
import BtUploader from "./uploader";
import BtLogoLoading from "./logoLoading";
import TerminusAvatar from "./TerminusAvatar";
import VueDragResize from "./VueDragResize";
import UploadFromFiles from "./UploadFromFiles";
import BtMenu from "./Menu";
import BtScrollArea from "./ScrollArea";
import BtNotify from "./notify";
import BtDialog from "./dialog";
import { NotifyDefinedType } from "./notify/type";
import BtTheme from "./theme";
import useColor from "./utils/useColor";

const components = [
	BtButton,
	BtLoading,
	BtUploader,
	BtLogoLoading,
	TerminusAvatar,
	VueDragResize,
	UploadFromFiles,
	BtMenu,
	BtScrollArea,
	BtTheme
];

// const app = createApp(Apps);
// app.use(Quasar, {
// 	plugins: {
// 		Notify,
// 		Dialog
// 	}
// });

// app.mount(document.body);

const install = function (app: App) {
	if ((install as any).installed) return;

	components.map((component) => {
		app.use(component);
	});

	// app.use(Quasar, {
	// 	plugins: {
	// 		Notify,
	// 		Dialog
	// 	}
	// });
};
// Global references can be automatically installed
if (typeof window !== "undefined" && (window as any).Vue) {
	install((window as any).Vue);
}
export default {
	install,
	BtButton,
	BtLoading,
	BtUploader,
	BtLogoLoading,
	TerminusAvatar,
	VueDragResize,
	UploadFromFiles,
	BtMenu,
	BtScrollArea,
	BtTheme,
	useColor
};

export {
	BtButton,
	BtLoading,
	BtUploader,
	BtLogoLoading,
	TerminusAvatar,
	VueDragResize,
	UploadFromFiles,
	BtMenu,
	BtScrollArea,
	BtNotify,
	NotifyDefinedType,
	BtDialog,
	BtTheme,
	useColor
};
