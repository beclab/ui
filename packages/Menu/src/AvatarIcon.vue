<template>
	<q-icon
		class="bt-menu-icon item-icon"
		size="20px"
		v-if="data.icon"
		:name="data.icon"
	/>
	<img
		v-else-if="data.img"
		:src="active && data.activeImg ? data.activeImg : data.img"
		style="height: 20px; max-width: 20px"
	/>
</template>

<script setup lang="ts">
import { useSlots } from "vue";
import { ItemCell } from "./Menu";

interface Props {
	data: ItemCell;
	active: boolean;
}
withDefaults(defineProps<Props>(), {});
const slots = useSlots();
</script>

<style lang="scss" scoped>
.bt-menu-icon {
	&.item-icon {
		font-size: 24px;
	}
	&.active {
	}
}
</style>
