<template>
  <div style="display: inline-block;"  :style="{width: width, height: height}">
    <div class="wrap" :style="{width: width, height: height}">
      <input
        v-show="!loading"
        class="quploader" 
        ref="fileUpload"
        @change="selectChange($event)" 
        :accept="accept"
        type="file"
        :multiple="false"
      />
      <slot class="slot"/>
    </div>


    <Cropper
      v-if="showCropper"
      :dialogVisible="showCropper"
      :cropper-img="cropperImg"
      @colse-dialog="closeDialog"
      @upload-img="uploadImg" 
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios, { AxiosRequestConfig } from 'axios';
import Cropper from './Cropper.vue';
export default defineComponent({
  name: "BtUploader",
  components: {
    Cropper
  },
  props: {
    width: {
      type: String,
      required: false,
      default: '100px'
    },
    height: {
      type: String,
      required: false,
      default: '100px'
    },
    action: {
      type: String,
      required: true,
    },
    accept: {
      type: String,
      required: false,
      default: ".jpg, image/*"
    },
    size: {
      type: Number,
      required: false,
      default: 5
    },
    type: {
      type: String,
      required: false,
      default: 'img',
      // validator(value) {
      //   return ['img', 'avator'].includes(value)
      // }
    },
    fileName: {
      type: String,
      required: false,
      default: 'file'
    },
    formData: {
      type: FormData,
      required: false,
    },
    config: {
      type: Object as () => AxiosRequestConfig,
      required: false,
    },
    parmas: {
      type: Object,
      required: false,
    }
  },

  setup(props: any, context) {
    const cropperImg = ref('');
    const showCropper = ref(false);
    const uploadFile = ref();
    const resultImg = ref('');
    const fileUpload = ref();
    const loading = ref(false);

    const factoryFn = async () => {
      let formData: FormData, config;
      if (props.formData) {
        formData = props.formData;
        formData.append(props.fileName, uploadFile.value);
      } else {
        formData = new FormData();
        formData.append(props.fileName, uploadFile.value);
        if (props.parmas) {
          Object.keys(props.parmas).forEach((key) => {
            formData.append(key, props.parmas[key]);
          })
        }
      }

      if (props.config) {
        config = props.config;
      } else {
        config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
      }

      const res = await axios.post(props.action, formData, config)
        .then(function (response) {
          context.emit('ok', response.data);
          showCropper.value = false;
          loading.value = false;
          context.emit('loading', false);
        })
        .catch(function (response) {
          context.emit('fail', response.data);
          loading.value = false;
          context.emit('loading', false);
        })
    }

    const selectChange = async (e: any) => {
      await openCropper(e.target.files[0]);
      e.target.value = '';
    }

    const openCropper = (file: any) => {
      var files = file;
      let isLt5M = files.size > (props.size << 20);
      if (isLt5M) {
        return `Please upload pictures within ${props.size}M`;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e?.target?.result === 'object') {
          data = e.target.result && window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e?.target?.result;
        }
        cropperImg.value = data || '';

      };
      // Convert to base64
      // reader.readAsDataURL(file)
      // Convert to blob
      reader.readAsArrayBuffer(files);

      if (props.type === 'avator') {
        showCropper.value = true;
      } else if (props.type === 'img') {
        uploadImg(files);
      }
    }

    const closeDialog = () => {
      showCropper.value = false;
      cropperImg.value = '';
    }

    const uploadImg = async (file: string) => {
      uploadFile.value = file;
      loading.value = true
      context.emit('loading', true);
      factoryFn();
    }

    return {
      cropperImg,
      showCropper,
      uploadFile,
      resultImg,
      loading,
      closeDialog,
      uploadImg,
      selectChange,

    }
  }
})

</script>

<style lang="less">
.wrap {
  position: relative;
  .quploader {
    display: inline-block;
    box-shadow: none;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }

  .slot {
    position: absolute;
    left: 0;
    top: 0;
  }
}


</style>
