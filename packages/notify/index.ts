import { Notify, QSpinner } from "quasar";
import { NotifyDefinedType, BtNotifyProps } from "./type";

const BtNotify: BtNotifyProps = {
	alwaysShow: null,
    notify: Notify,
	async show(props: any): Promise<void> {
        if (!this.notify) {
            this.init(Notify)
        }
		if (props.closeTimeout) {
			this.alwaysShow = this.notify?.create({
				...props
			});
		} else {
			this.notify?.create({
				timeout: 2000,
				...props
			});
		}
	},

	hide(): void {
		this.alwaysShow && this.alwaysShow();
	},

	async init(notify?: Notify): Promise<void> {
        if (!notify) {
            return
        }
        this.notify = notify;
        notify.registerType(NotifyDefinedType.LOGIN_NOTIFY, {
            position: "bottom",
            html: true,
            timeout: 0,
            color: "transparent",
            textColor: "warning",
            classes: "login-notification-add",
            icon: "sym_r_cancel"
        });

        notify.registerType(NotifyDefinedType.SUCCESS, {
            position: "bottom",
            html: true,
            timeout: 0,
            color: "white",
            textColor: "positive",
            classes: "success-notify-class",
            icon: "sym_r_check_circle",
            group: false
        });

        notify.registerType(NotifyDefinedType.FAILED, {
            position: "bottom",
            html: true,
            timeout: 0,
            color: "white",
            textColor: "negative",
            classes: "failed-notify-class",
            icon: "sym_r_cancel",
            group: false
        });

        notify.registerType(NotifyDefinedType.WARNING, {
            position: "bottom",
            html: true,
            timeout: 0,
            color: "white",
            textColor: "warning",
            classes: "warning-notify-class",
            icon: "sym_r_error",
            group: false
        });

        notify.registerType(NotifyDefinedType.LOADING, {
            position: "bottom",
            html: true,
            timeout: 0,
            color: "white",
            textColor: "grey-8",
            classes: "loading-notify-class",
            spinner: QSpinner,
            spinnerSize: "xs",
            spinnerColor: "grey-8",
            group: false
        });

        notify.registerType(NotifyDefinedType.PROGRESS, {
            position: "bottom",
            html: true,
            timeout: 0,
            color: "white",
            textColor: "info",
            classes: "progress-notify-class",
            spinner: QSpinner,
            spinnerSize: "sm",
            spinnerColor: "info",
            group: false
        });
	}
};

export default BtNotify;