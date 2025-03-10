<template>
	<q-dialog class="card-dialog" ref="dialogRef" v-model="show">
		<q-card
			class="card-container no-shadow"
			:style="{ width, maxWidth: width }"
		>
			<dialog-bar
				:title="title"
				:icon="icon"
				:platform="platform"
				@close="onCancel"
			/>

			<div class="dialog-content">
				<slot />
			</div>

			<dialog-footer
				:ok="ok"
				:cancel="cancel"
				:okStyle="okStyle"
				:loading="okLoading"
				:platform="platform"
				:skip="skip"
				@onCancel="onCancel"
				@onSubmit="onSubmit"
				@onSkip="onSkip"
			/>
		</q-card>
	</q-dialog>
</template>

<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar';
import { ref, defineProps, computed } from 'vue';

import DialogBar from './DialogBar.vue';
import DialogFooter from './DialogFooter.vue';

import { Platform, Size } from './type';

interface Props {
	showDialog: boolean;
	platform: Platform;
	size: Size;
	title: string;
	icon: string;
	ok: string | boolean;
	okStyle: object;
	cancel: string | boolean;
	okLoading: string | boolean;
	skip: string | boolean;
}
const props = withDefaults(defineProps<Props>(), {
	showDialog: false,
	platform: Platform.WEB,
	size: Size.SMALL,
	ok: true,
	okStyle: () => ({}),
	okLoading: false
});

const emits = defineEmits(['onSubmit', 'onCancel', 'onSkip']);

const { dialogRef, onDialogCancel, onDialogOK, onDialogHide } =
	useDialogPluginComponent();

const show = ref(true);

const width = computed(() => {
	switch (props.size) {
		case Size.SMALL:
			return '400px';

		case Size.MEDIUM:
			return '560px';

		case Size.LARGE:
			return '800px';

		default:
			return '400px';
	}
});

const onSubmit = async () => {
	emits('onSubmit');
};

const onCancel = () => {
	emits('onCancel');
	onDialogCancel();
};

const onSkip = () => {
	emits('onSkip');
	onDialogCancel();
};

defineExpose({
	onDialogOK,
	onDialogCancel,
	onDialogHide
});
</script>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'BtCustomDialog'
});
</script>

<style lang="scss" scoped>
.card-dialog {
	.card-container {
		border-radius: 12px;
		padding: 20px;
		.dialog-content {
			padding: 20px 2px 32px;
		}
	}
}
</style>
