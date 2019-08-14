<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <span>{{ text }}</span>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { demo } from '@/api/demo.js';
export default {
  name: 'home',
  data(){
    return {
      text:''
    };
  },
  components: {
    HelloWorld
  },
  created(){
    demo().then(res=>{
      if(res.code===0){
        this.text = res.data;
      }
    })
  }
};
</script>
