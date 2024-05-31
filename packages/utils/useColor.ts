import { useQuasar, colors } from "quasar";
import { ref, watchEffect } from "vue";

const { getPaletteColor } = colors;
const $q = useQuasar();

function useColor(variable: string) {
	const $q = useQuasar();
	const color = ref(getPaletteColor(variable));

	watchEffect(() => {
		color.value = $q.dark.isActive
			? getPaletteColor(variable)
			: getPaletteColor(variable);
	});

	return { color };
}

export default useColor;
