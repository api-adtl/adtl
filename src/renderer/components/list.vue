<template>
    <div>
        这是列表
        <Button @click="view_button" type="primary">按钮可见</Button>
        <br>
        <list_index :add="add" @add_content="add_content" dir=".">
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

      add_content (content) {
        console.log('增加分组')
        if (this.$lodash.isString(content)) {
          this.$router.push('/open/' + content)
        } else {
          this.$router.push({
            name: content.name,
            query: content.query
          })
        }

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
