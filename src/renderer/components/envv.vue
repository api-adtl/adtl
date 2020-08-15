<template>
    <div >
      <Select v-model="selectmodel" size="small" style="width:100px">
        <Option v-for="(item,index) in env_list" :value="index" :key="index">{{ index}}</Option>
      </Select>
      <Button type="primary" shape="circle" icon="md-settings" @click="editenv"></Button>

    </div>
</template>

<script>

  import envv from '../logic/envv'

  export default {
    name: 'envv',
    data () {
      return {
        envv:null,
        env_list: {},
        fuzhi:false,
        selectmodel:'default',
      }
    },
    components: {},
    methods: {
      init(){
        this.envv = new envv();
        console.log(this.envv);
        this.envv.read((data)=>{
          this.env_list = data;
        });
      },
      editenv(){
        console.log('修改环境变量')
        this.$router.push('/open/editenv')
      }
    },
    created () {
      this.init();
    }
  }
</script>

<style>

</style>
