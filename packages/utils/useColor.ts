import { useQuasar, colors, Dark } from "quasar";
import { ref, watchEffect } from "vue";

const { getPaletteColor } = colors;
const $q = useQuasar();

function useColor(variable: string) {
	const $q = useQuasar();
	const isDarkActive = $q?.dark || Dark;
	const color = ref(getPaletteColor(variable));

	watchEffect(() => {
		color.value = isDarkActive
			? getPaletteColor(variable)
			: getPaletteColor(variable);
	});

	return { color };
}

export default useColor;
