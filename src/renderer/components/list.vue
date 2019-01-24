<template>
    <div>
        这是列表
        <Button @click="view_button" type="primary">现实按钮</Button>
        <br>
        <list_index :add="add" dir=".">
        </list_index>

    </div>

</template>

<script>
  import list_index from './list/index'

  export default {
    name: 'list',
    data () {
      return {
        listdata: {},
        add: false
      }
    },
    components: {list_index},
    methods: {
      add_group () {
        console.log('增加分组')
        this.$emit('add_content', 'add_group')
      },
      add_api () {
        console.log('增加API')
        this.$emit('add_content', 'add_api')
      },
      view_button () {
        this.add = !this.add
      }
    },
    created () {

    }
  }
</script>

<style>
    .type {
        font-size: 1.1em;
        font-weight: bold;
        color: brown;
    }

    .ivu-cell-extra {
        font-size: 1.1em;
        font-weight: bold;
        color: brown;
    }
</style>
