<template>
  <div>
    内容列表/index
    <span>
      list_string:{{tab0}}


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
    created(){

    }
  }
</script>

<style>

</style>
