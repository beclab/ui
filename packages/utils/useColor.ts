import {colors, Dark} from "quasar";
import { ref, watchEffect } from "vue";

const { getPaletteColor } = colors;

function useColor(variable: string) {
	const color = ref(getPaletteColor(variable));

	watchEffect(() => {
		color.value = Dark.isActive
			? getPaletteColor(variable)
			: getPaletteColor(variable);
	});

	return { color };
}

export default useColor;
