<template>
  <div :style="{width: size + 'px', height: size + 'px'}">
    <img v-if="src" :src="src" style="width: 100%;height: 100%;"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType,watch } from 'vue';
import {account_es6} from "terminus-sdk-es6";
import getAvatarAddress = account_es6.getAvatarAddress;

interface TerminusInfo {
	terminusName: string;
	wizardStatus?: string;
	selfhosted?: boolean;
	tailScaleEnable?: boolean;
	osVersion?: string;
	avatar?: string;
	loginBackground?: string;
    terminusId:string;
}

export default defineComponent({
  name: 'TerminusAvatar',
  props: {
    info: {
      type: Object as PropType<TerminusInfo>,
		  require: false
    },
    size: {
      type: Number,
      default: 48,
    },
    isMe : {
      type: Boolean,
      default: true
    },
    useGlobalCDN: {
      type:Boolean,
      default: true
    }
  },
  components: {},
  setup(props:any) {
    
    const src =  ref();
    watch(() => props.info,(newValue) => {
        if (newValue){
            src.value = getAvatarAddress(newValue,props.useGlobalCDN,props.isMe)
        }
    },{
        immediate : true,
        deep : true
    })

    return {
      src,
    };
  },
});
</script>
