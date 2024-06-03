<template>
	<q-toggle
		v-if="props.showThemeToggle"
		v-model="isDark"
		@update:model-value="change"
	/>
</template>

<script setup lang="ts">
import { watchEffect, ref, defineProps } from "vue";
import { useQuasar, setCssVar, getCssVar, colors } from "quasar";
import { themeModeName, ThemeDefinedMode } from '../types';

interface Props {
	showThemeToggle: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	showToggle: false
});

const { getPaletteColor, changeAlpha } = colors;

const $q = useQuasar();
const isDark = ref(false);

if (props.showThemeToggle) {
	$q.dark.set(true);
	isDark.value = true;
}

const change = () => {
	$q.dark.toggle();
};
const variables = [
	"background-1",
	"background-2",
	"background-3",
	"background-4",
	"background-5",
	"background-6",
	"background-hover",
	"background-selected",
	"separator",
	"separator-2",
	"ink-1",
	"ink-2",
	"ink-3",
	"ink-on-brand",
	"ink-on-brand-disabled",
	"input-bg-disabled",
	"input-stroke",
	"input-stroke-hover",
	"input-stroke-disabled",
	"radio-stroke",
	"radio-stroke-hover",
	"radio-stroke-disabled",
	"btn-bg-hover",
	"btn-bg-pressed",
	"btn-stroke",
	"btn-stroke-hover",
	"btn-stroke-disabled",
	"orange-soft",
	"orange-alpha",
	"orange-default",
	"orange-hover",
	"orange-pressed",
	"orange-disabled",
	"blue-soft",
	"blue-alpha",
	"blue-default",
	"blue-hover",
	"blue-pressed",
	"blue-disabled",
	"red-soft",
	"red-alpha",
	"red-default",
	"red-hover",
	"red-pressed",
	"red-disabled",
	"yellow-soft",
	"yellow-alpha",
	"yellow-default",
	"yellow-hover",
	"yellow-pressed",
	"yellow-disabled",
	"green-soft",
	"green-alpha",
	"green-default",
	"green-hover",
	"green-pressed",
	"green-disabled",
	"teal-soft",
	"teal-alpha",
	"teal-default",
	"teal-hover",
	"teal-pressed",
	"teal-disabled",
	"light-blue-soft",
	"light-blue-alpha",
	"light-blue-default",
	"light-blue-hover",
	"light-blue-pressed",
	"light-blue-disabled",
	"light-green-soft",
	"light-green-alpha",
	"light-green-default",
	"light-green-hover",
	"light-green-pressed",
	"light-green-disabled"
];

const light = variables.map((item) => ({
	name: item,
	value: getPaletteColor(`${item}-light`)
}));
const dark = variables.map((item) => ({
	name: item,
	value: getPaletteColor(`${item}-dark`)
}));

watchEffect(() => {
	if ($q.dark.isActive) {
		dark.forEach((item) => {
			setCssVar(item.name, item.value);
		});
	} else {
		light.forEach((item) => {
			setCssVar(item.name, item.value);
		});
	}
});

const themeValue = $q.cookies.get(themeModeName);
if (themeValue) {
    const theme = Number(themeValue);
    if (theme == ThemeDefinedMode.AUTO) {
        $q.dark.set('auto');
    } else {
        $q.dark.set(theme == ThemeDefinedMode.DARK);
    }
}
</script>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "BtTheme"
});
</script>
<style></style>
