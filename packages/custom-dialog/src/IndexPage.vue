<template>
  <q-dialog
    class="card-dialog"
    ref="dialogRef"
    v-model="show"
    @hide="hiddenDialog"
    :noRouteDismiss="noRouteDismiss"
  >
    <q-card
      class="card-container no-shadow column no-wrap"
      :style="{ width, maxWidth: width, height }"
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
        :okDisabled="okDisabled"
        :okClass="okClass"
        @onCancel="onCancel"
        @onSubmit="onSubmit"
        @onSkip="onSkip"
      >
        <template #footerMore>
          <slot name="footerMore" />
        </template>
      </dialog-footer>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar';
import { ref, defineProps, computed, watch } from 'vue';

import DialogBar from './DialogBar.vue';
import DialogFooter from './DialogFooter.vue';

import { Platform, Size } from './type';

interface Props {
  platform: Platform;
  size: Size;
  title: string;
  icon: string;
  ok: string | boolean;
  okStyle: object;
  okClass: string;
  cancel: string | boolean;
  okLoading: string | boolean;
  skip: string | boolean;
  fullWidth: boolean;
  fullHeight: boolean;
  okDisabled: boolean;
  noRouteDismiss: boolean;
  modelValue?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  platform: Platform.WEB,
  size: Size.SMALL,
  ok: true,
  okStyle: () => ({}),
  okClass: '',
  okLoading: false,
  fullWidth: false,
  fullHeight: false,
  okDisabled: false,
  noRouteDismiss: false,
  modelValue: true
});

const emits = defineEmits(['onSubmit', 'onCancel', 'onSkip', 'onHide', 'update:modelValue']);

const { dialogRef, onDialogCancel, onDialogOK, onDialogHide } = useDialogPluginComponent();

console.log(props.modelValue)

const show = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    show.value = newValue;
});

const widthRatio = ref(0.86);
const heightRatio = ref(0.75);

const width = computed(() => {
  if (props.fullWidth) {
    const innerWidth = window.innerWidth;
    return innerWidth * widthRatio.value + 'px';
  }

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

const height = computed(() => {
  if (props.fullHeight) {
    const innerHeight = window.innerHeight;
    return innerHeight * heightRatio.value + 'px';
  }

  return 'auto';
});

const onSubmit = async () => {
  emits('onSubmit');
};

let hidden = true;

const onCancel = () => {
  hidden = false;
  emits('onCancel');
  onDialogCancel();
};

const hiddenDialog = () => {
  if (hidden) {
    emits('onHide');
  }
    emits('update:modelValue', false);
};

const onSkip = () => {
  emits('onSkip');
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
      flex: 1;
      margin: 20px 0 32px;
      width: 100%;
      max-height: calc(100vh * 0.75);
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
