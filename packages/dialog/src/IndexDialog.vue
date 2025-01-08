<template>
    <q-dialog class="card-dialog" ref="dialogRef">
        <q-card class="card-continer no-shadow" :style="{ width: platform === 'web' ? '400px' : '320px' }">

            <!-- <slot name="dialogBar" />   -->

            <dialog-bar
                :title="title"
                :icon="icon"
                :titAlign="titAlign"
                :platform="platform"
                @close="onCancel"
            />

            <div class="q-pa-lg">
                <div v-if="prompt">
                    <div class="prompt-name q-mb-xs" v-if="prompt.name">{{ prompt.name }}</div>
                    <q-input
                        class="prompt-input"
                        v-model="promptModel"
                        borderless
                        input-class="text-ink-2"
                        dense
                        :placeholder="prompt.placeholder"
                    />
                </div>
                <template v-else>
                    {{ message }}
                    <slot />
                </template>
            </div>

            <dialog-footer
                :ok="ok"
                :cancel="cancel"
                :okStyle="okStyle"
                :loading="okLoading"
                :platform="platform"
                @close="onCancel"
                @submit="submit"
            />

            <!-- <slot name="dialogFooter" />   -->

        </q-card>
    </q-dialog>
</template>

<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar';
import { ref, defineProps } from 'vue';

import DialogBar from './DialogBar.vue';
import DialogFooter from './DialogFooter.vue';

const props = defineProps({
    platform: {
        type: String,
        default: 'web',
        required: false
    },
    message: {
        type: String,
        default: '',
        required: false
    },
    title: {
        type: String,
        default: 'Alert',
        required: false
    },
    icon: {
        type: String,
        default: '',
        required: false
    },
    titAlign: {
        type: String,
        default: 'left',
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
    okLoading: {
        type: [String, Boolean],
        default: false,
        required: false
    },
    prompt: {
        type: Object as () => any,
        required: false
    }
});

const { dialogRef, onDialogCancel, onDialogOK } = useDialogPluginComponent();

const loading = ref(false);
const promptModel = ref<string>();

if (props.prompt && props.prompt.model){
    promptModel.value = props.prompt.model as string;
}

const submit = async () => {
    loading.value = true;
    if (props.prompt) {
        if(promptModel.value) {
            onDialogOK(promptModel.value);
        } else {
            onDialogCancel();
        }
    } else {
        onDialogOK(true);
    }
};

const onCancel = () => {
    console.log('oncancel')
    onDialogCancel();
};
</script>

<style lang="scss" scoped>
.card-dialog {
    .card-continer {
        border-radius: 12px;
        .prompt-name {
            color: $ink-3;
            font-size: 12px;
            line-height: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .prompt-input {
            border: 1px solid $input-stroke;
            border-radius: 8px;
            padding: 0 10px;
        }
    }
}
</style>