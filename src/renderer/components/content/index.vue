<template>
  <div>
    内容列表/index 1

    <span>
      list_string: {{tab0}}
    </span>
  </div>
</template>

<script>


  export default {
    name: 'content_index',
    data(){
      return {
        tab0: true,
        tab1: true,
        tab2: true
      }
    },
    filters: {},

    components: {  },
    methods: {},
    mounted(){
      //组件激活
      let f5 = document.getElementById("f5");
      if(typeof f5 == 'object'){
        
        f5.click();
      }
      this.$Message.success("刷新列表完成!");
    
    }
  }
</script>

<style>

</style>
