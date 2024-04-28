<template>
	<q-item-section class="bt-itemlabel-container">
		<q-item-label lines="1">
			<span class="text-body1">{{ data.label }}</span>
			<BadgeCount
				v-if="data.count != undefined"
				class="q-ml-sm"
				:active="active"
				:activeClass="activeClass"
				>{{ data.count }}</BadgeCount
			>
		</q-item-label>
	</q-item-section>
</template>

<script setup lang="ts">
import BadgeCount from "./BadgeCount.vue";
import { ItemCell } from "./Menu";

interface Props {
	data: ItemCell;
	active: boolean;
	activeClass: string;
}
withDefaults(defineProps<Props>(), {});
</script>

<style lang="scss" scoped>
.bt-itemlabel-container {
}
</style>
