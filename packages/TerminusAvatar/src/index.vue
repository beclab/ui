<template>
  <div :style="{width: size + 'px', height: size + 'px'}">
    <img v-if="src" :src="src" style="width: 100%;height: 100%;"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, computed } from 'vue';
import { Encoder } from './encoder';

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

function stringToIntHash(str: string, lowerbound: number, upperbound: number) {
    if(!str) {
      return lowerbound;
    }
    
    let result = 0;
    for (let i = 0; i < str.length; i++) {
      result = result + str.charCodeAt(i);
    }

    if (!lowerbound) lowerbound = 0;
    if (!upperbound) upperbound = 500;

    return (result % (upperbound - lowerbound)) + lowerbound;
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
    
    const src =  computed(() => {

      // not set ternimusName
      if( !props.info.terminusName ) {
          return `https://file.bttcdn.com/avatar3/1.png`;  
      }

      if( !props.info.avatar ) {
        let id = ref(stringToIntHash(props.info.terminusName, 1, 36));
        if( props.useGlobalCDN) {
          return  `https://file.bttcdn.com/avatar3/${id.value}.png`;
        } else {          
          return `https://` + props.info.terminusName.replace('@','.') + `/avatar/${id.value}.png`;
        }
      }

      if( props.info.avatar.startsWith('http') ){
          return props.info.avatar;
      } else {
        const re = new RegExp("^[1-3]?[0-9]\\.png");
        if( re.test(props.info.avatar) ) {
          console.log('re test true');
          if( props.isMe) {
            if( props.useGlobalCDN) {
              return 'https://file.bttcdn.com/avatar3/'+ props.info.avatar;
            } else {
              return `https://` + props.info.terminusName.replace('@','.') + `/avatar/` + props.info.avatar;
            }
          } else {
            if( props.useGlobalCDN) {
              return `https://file.bttcdn.com/avatar3/${props.info.avatar}`;
            } else {
              return `https://` + props.info.terminusName.replace('@','.') + `/avatar/` + props.info.avatar;
            }
          }
        } else {
          try {
            const vp = JSON.parse(props.info.avatar);
            console.log(vp);
            if( vp ) {
              const vcstr = Encoder.bytesToString(
                Encoder.base64UrlToBytes(vp.verifiableCredential![0].split('.')[1])
              );
              console.log(vcstr);
              const vc = JSON.parse(vcstr);
              console.log(vc);
              console.log(vc.vc.credentialSubject.image);
              let imageUrl = vc.vc.credentialSubject.image;
              if (imageUrl.startsWith('ipfs://')) {
                imageUrl = imageUrl.replace(
                  'ipfs://',
                  'https://gateway.ipfs.io/ipfs/'
                );
             }

              console.log(imageUrl)
              return imageUrl;  
            } else {
              return `https://file.bttcdn.com/avatar3/1.png`;  
            }
          } catch(e) {
            console.log(e);
            return `https://file.bttcdn.com/avatar3/1.png`;  
          }
        }
      }
  });


    
  

    // onMounted(() => {

     


    //   // let url =  '';
    //   // if (validateEmail(props.did)) {
    //   //   const did = props.did.replace('@', '.');
    //   //   url = `https://${did}/avatar`;
    //   // } else {
    //   //   url = `https://${props.did}.snowinning.com/avatar`;
    //   // }

    //   // checkImg(url)
    //   //   .then((res) => {
    //   //     src.value = url;
    //   //   })
    //   //   .catch((err) => {
    //   //     src.value = `https://file.bttcdn.com/avatar2/${id.value}.png`;
    //   //   });
    //   console.log(props.info);
    //   console.log(id);
    //   if( props.info.avatar ) {
       
    //   }  else {
    //     src.value = `https://file.bttcdn.com/avatar3/${id.value}.png`;
    //   }
    // });

    return {
      src,
    };
  },
});
</script>
