<template>
	<div class="relative-position terminal-content">
		<div class="terminal-content-wrapper">
			<div class="full-height" ref="terminalRef"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import ReconnectingWebSocket, {
	type ErrorEvent,
	type CloseEvent
} from 'reconnecting-websocket';
import { debounce } from '../../utils/lodash';
import { onMounted } from 'vue';
import { onBeforeUnmount } from 'vue';
import 'xterm/css/xterm.css';

type WSType = ReconnectingWebSocket | undefined;

interface Props {
	data: {
		namespace: string;
		podName: string;
		container: string;
	};
	shell?: 'sh' | 'bash';
}
const props = withDefaults(defineProps<Props>(), {
	shell: 'sh'
});

let messageQueue: string[] = [];
let fitAddon: FitAddon;
let termTemp: Terminal;

let ws: WSType = undefined;
const initTimer = ref();
const first = ref(true);

const terminalRef = ref();
let locker: ReturnType<typeof setInterval> | undefined = undefined;

const isWsOpen = () => {
	return ws && ws.readyState === ws.OPEN;
};

const packResize = (col: number, row: number) =>
	JSON.stringify({
		Op: 'resize',
		Cols: col,
		Rows: row
	});

const resizeRemoteTerminal = () => {
	const { cols, rows } = termTemp;
	if (isWsOpen()) {
		ws?.send(packResize(cols, rows));
	}
};

const disableTermStdin = (disabled = true) => {
	// const { textarea = {} } = termTemp
	// textarea.disabled = disabled
};

const unpackStdout = (data: any) => data.Data;

const onWSReceive = (event: MessageEvent) => {
	const data = JSON.parse(event.data);
	initTimer.value && clearInterval(initTimer.value);

	setHeartBeat();

	if (first.value) {
		first.value = false;
		disableTermStdin(false);
		termTemp.reset();
		termTemp.element && termTemp.focus();
		resizeRemoteTerminal();
	}

	const stdout = unpackStdout(data);
	termTemp.write(stdout);
};

const disconnect = () => {
	if (termTemp) {
		disableTermStdin(true);
	}

	if (ws) {
		ws.close(1000);
	}
};

const fatal = (message: any) => {
	const isEdgeNode = false;
	if (!message && first)
		message = `Could not connect to the ${
			isEdgeNode ? 'node' : 'container'
		}. Do you have sufficient privileges?`;
	if (!message) message = 'disconnected';
	if (!first.value) message = `\r\n${message}`;
	if (first.value) termTemp.reset();

	termTemp.write(`\x1b[31m${message}\x1b[m\r\n`);
};

const onWSError = (ex: ErrorEvent): void => {
	initTimer.value && clearInterval(initTimer.value);
	fatal(ex.message);
};

const createWS = (): ReconnectingWebSocket => {
	const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
	const websocketUrl = `${protocol}//${window.location.host}/kapis/terminal.kubesphere.io/v1alpha2/namespaces/${props.data.namespace}/pods/${props.data.podName}/exec?container=${props.data.container}&shell=${props.shell}`;
	return new ReconnectingWebSocket(websocketUrl);
};

const fitTerm = () => {
	fitAddon && fitAddon.fit();
	resizeRemoteTerminal();
};

const onResize = debounce(fitTerm, 300);

const onTerminalResize = () => {
	window.addEventListener('resize', onResize);
};

const packStdin = (data: any) =>
	JSON.stringify({
		Op: 'stdin',
		Data: data
	});

const sendTerminalInput = (data: any) => {
	if (isWsOpen()) {
		ws?.send(packStdin(data));
	} else {
		messageQueue.push(packStdin(data));
	}
};

const onTerminalKeyPress = () => {
	termTemp.onData(sendTerminalInput);
};

const focus = () => {
	if (isWsOpen()) {
		termTemp.focus();
	}
};

const show = () => {
	initTerm();
	ws = createWS();
	if (ws !== undefined) {
		ws.addEventListener('open', () => {
			messageQueue.forEach((msg) => ws?.send(msg));
			messageQueue = [];
		});

		ws.addEventListener('message', onWSReceive);
		ws.addEventListener('error', onWSError);
		ws.addEventListener('close', (event: CloseEvent) => console.log(event));
		onTerminalResize();
		onTerminalKeyPress();
		disableTermStdin();
	}
};

const hide = () => {
	clearHeartBeat();
	termTemp && termTemp.dispose();
	ws && ws.close(1000);
	first.value = true;
	disconnect();
	removeResizeListener();
	initTimer.value && clearInterval(initTimer.value);
};

const DEFAULT_TERMINAL_OPTS = {
	backgroundOpacity: 0.9,
	cursorBlink: true,
	fontFamily: '"Fira Code", "DejaVu Sans Mono", monospace',
	fontSize: 14,
	letterSpacing: 0.8,
	lineHeight: 1.2,
	theme: {
		background: '#181d28'
	}
};

const getTerminalOpts = () => {
	return DEFAULT_TERMINAL_OPTS;
};

const renderConnecting = (term: Terminal, initText: string) => {
	let count = 0;
	const timer = setInterval(() => {
		term.reset();
		term.write(`${initText}${'.'.repeat(++count)}`);
		if (count > 2) {
			count = 0;
		}
	}, 500);
	return timer;
};

const removeResizeListener = () => {
	window.removeEventListener('resize', onResize);
};

const clearHeartBeat = () => {
	locker && clearInterval(locker);
};
const setHeartBeat = () => {
	clearHeartBeat();
	locker = setInterval(() => {
		ws?.send(JSON.stringify({ op: 'stdin' }));
	}, 25 * 1000);
};
const initTerm = () => {
	const initText = 'connecting';
	const terminalOpts = getTerminalOpts();

	termTemp = new Terminal(terminalOpts);
	fitAddon = new FitAddon();
	termTemp.loadAddon(fitAddon);
	termTemp.loadAddon(new WebLinksAddon());
	if (terminalRef.value) {
		termTemp.open(terminalRef.value);
		fitAddon.fit();
	}

	initTimer.value = renderConnecting(termTemp, initText);

	return termTemp;
};

onMounted(() => {
	show();
});

onBeforeUnmount(() => {
	hide();
});

defineExpose({ focus: focus });

</script>
<style lang="scss" scoped>
.terminal-content {
	overflow: hidden;
	height: 100%;
	background: #181d28;
	.terminal-content-wrapper {
		position: absolute;
		inset: 20px;
		top: 12px;
		bottom: 12px;
	}
}
</style>
