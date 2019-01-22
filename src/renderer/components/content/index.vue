<template>
  <div>
    内容列表/index
    <span>
      list_string:{{value}}

      <Tabs type="card" :animated="false" closable @on-tab-remove="handleTabRemove">
        <div v-for="item in value">
            <div>
              {{item}}
            </div>
        </div>
      </Tabs>
    </span>
  </div>
</template>

<script>


  export default {
    name: 'content_index',
    data(){
      return {
        liststring:this.value,
        tab0: true,
        tab1: true,
        tab2: true
      }
    },
    filters:{
      router(url){
        return "/index.html#"+url;
      }

    },
    props: {
      value: { // 必须要使用value
        default: {},
      },
    },
    components: {  },
    methods: {
      handleTabRemove(){
        this['tab' + name] = false;
      },
      update(){
        this.$emit('input', this.value)
      }
    },
    created(){

    }
  }
</script>

<style>

</style>
