<template>
	<span
		class="bt-badgecount-container text-subtitle3 q-px-sm"
		:class="[active ? activeClass : '']"
	>
		<slot></slot>
	</span>
</template>

<script setup lang="ts">
interface Props {
	active: boolean;
	activeClass: string;
}

withDefaults(defineProps<Props>(), {});
</script>

<style lang="scss" scoped>
.bt-badgecount-container {
	display: inline-block;
	background: $grey-1;
	border-radius: 8px;
}
</style>
