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
| onSubmit | Confirmed events at the bottom | string \ number | true |  |
| onCancel | Cancel event at the bottom | string \ number | false |  |
| onSkip | hide event at the bottom | string \ number | false |  |
| okLoading | Shown when data is being sent | string \ boolean | false |  |
| okStyle | Confirm the style of the button | Object |  |  |

## Examples

### html

```html
<bt-custom-dialog
  ref="CustomRef"
  title="alert"
  icon="sym_r_download"
  :cancel="true"
  :skip="true"
  :okLoading="loading"
  size="medium"
  :okStyle="{ background: '#FF7733', color: 'white' }"
  @submit="submit"
>
  <div>This is a message.</div>
</bt-custom-dialog>
```

### ts

```ts
const CustomRef = ref();
const loading = ref(false);
const submit = () => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
    CustomRef.value.onDialogOK();
  }, 2000);
};
```
