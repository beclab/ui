<template>
  <div class="bar text-ink-1">
    <div class="head row items-center justify-center">
      <q-icon v-if="icon" class="icon q-mr-sm" :name="icon" />
      <div class="title col text-left">
        {{ title }}
      </div>
    </div>

    <q-btn dense flat icon="close" color="ink-3" v-close-popup @click="close">
      <q-tooltip>Close</q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  platform: {
    type: String,
    default: 'web',
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
  }
});

const emits = defineEmits(['close']);

const close = () => {
  emits('close');
};
</script>

<style scoped lang="scss">
.mobile-title {
  color: $ink-1;
  font-size: 16px;
  text-align: center;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bar {
  height: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .head {
    height: 24px;
    line-height: 24px;
  }

  .icon {
    font-size: 24px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
