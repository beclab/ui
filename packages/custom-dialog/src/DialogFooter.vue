<template>
	<q-card-actions class="row justify-end items-center" style="padding: 0">
		<q-item
			v-if="skip"
			clickable
			dense
			class="but-skip row justify-center items-center q-mr-md"
			@click="onSkip"
		>
			{{ skip === true ? 'Skip' : skip }}
		</q-item>

		<div class="row justify-center items-center">
			<q-item
				v-if="cancel"
				clickable
				dense
				class="but-cancel row justify-center items-center q-mr-md"
				@click="onCancel"
			>
				{{ cancel === true ? 'Cancel' : cancel }}
			</q-item>
			<q-item
				v-if="loading"
				dense
				class="but-create row justify-center items-center"
				:style="okStyle"
			>
				{{ loading === true ? 'Loading' : loading }}
			</q-item>
			<q-item
				v-else
				clickable
				dense
				class="but-create row justify-center items-center"
				@click="onOK"
				:style="okStyle"
			>
				{{ ok === true ? 'Confirm' : ok }}
			</q-item>
		</div>
	</q-card-actions>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';

defineProps({
	platform: {
		type: String,
		default: 'web',
		required: false
	},
	ok: {
		type: [String, Boolean],
		default: true,
		required: false
	},
	okStyle: {
		type: Object as () => any,
		required: false
	},
	cancel: {
		type: [String, Boolean],
		default: false,
		required: false
	},
	loading: {
		type: [String, Boolean],
		default: false,
		required: false
	},
	skip: {
		type: [String, Boolean],
		default: false,
		required: false
	}
});

const $q = useQuasar();
const emit = defineEmits(['close', 'submit', 'skip']);

const onCancel = () => {
	emit('close');
};

const onOK = (e: any) => {
	emit('submit', e);
};

const onSkip = () => {
	emit('skip');
};
</script>

<style scoped lang="scss">
.but-create {
	border-radius: 8px;
	font-weight: 500;
	background: $yellow-6;
	color: $grey-10;
	padding: 8px 20px;
	line-height: 24px;
}
.but-cancel {
	border-radius: 8px;
	font-weight: 500;
	border: 1px solid $btn-stroke;
	color: $ink-2;
	padding: 8px 20px;
	line-height: 24px;
}

.but-skip {
	position: absolute;
	left: 20px;
	border-radius: 8px;
	font-weight: 500;
	border: 1px solid $btn-stroke;
	color: $ink-2;
	padding: 8px 20px;
	line-height: 24px;
}

.card-action {
	.cancel-button {
		width: 48%;
	}
}
</style>
