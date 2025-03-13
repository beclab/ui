## When To Use

- When you need to show alert messages to users.
- When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow, you can use Modal to create a new floating layer over the current page to get user feedback or display information.

## API

### BtCustomDialog

API properties extends from Quasar [QDialogOptions](http://www.quasarchs.com/vue-components/dialog)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| size | large, medium or small | string | small |  |
| title | title | string | Alert |  |
| icon | header bar icon | string |  |  |
| ok | confirm text or concealment of the event | string \ number | true |  |
| cancel | cancel text or concealment of the event | string \ number | true |  |
| skip | skip text or concealment of the event | string \ number | true |  |
| onSubmit | Confirmed events at the bottom | - | true |  |
| onCancel | Cancel event at the bottom | - | false |  |
| onSkip | hide event at the bottom | - | false |  |
| okLoading | Shown when data is being sent | - | false |  |
| okStyle | Confirm the style of the button | Object |  |  |

## Examples

### CustomDialog

```html
<template>
  <bt-custom-dialog
    ref="CustomRef"
    title="alert"
    icon="sym_r_download"
    :cancel="true"
    :skip="true"
    :okLoading="loading"
    size="small"
    :okStyle="{ background: '#FF7733', color: 'white' }"
    @onSubmit="onSubmit"
    @onCancel="onCancel"
  >
    <div>This is a message.</div>
  </bt-custom-dialog>
</template>

<style></style>

<script lang="ts" setup>
  import { ref } from 'vue';
  import BtCustomDialog from '../../packages/custom-dialog/src/IndexPage.vue';

  const props = defineProps(['item']);

  console.log('props', props.item);

  const CustomRef = ref();
  const loading = ref(false);
  const onSubmit = () => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      CustomRef.value.onDialogOK();
    }, 2000);
  };

  const onCancel = () => {
    // CustomRef.value.onDialogCancel();
  };
</script>
```

### Use Dialog

```ts
const openDialog = () => {
  $q.dialog({
    component: CustomDialog
  });
};
```
