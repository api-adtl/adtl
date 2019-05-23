<template>
    <div>
        <!-- 这是列表 -->
        <Button @click="view_button" size="small" type="primary">按钮可见</Button>
        <Button @click="f5=!f5" size="small" type="primary" id="f5">刷新</Button>
        <br>
        <div style="width: 170px">
            <list_index :f5="f5" :zhantie="fuzhi" @fuzhi="fuzhi2" :add="add" @add_content="add_content" dir=".">
            </list_index>
        </div>


    </div>

</template>

<script>
  import list_index from './list/index'

  export default {
    name: 'list',
    data () {
      return {
        listdata: {},
        add: true,
        f5:true,
        fuzhi:false
      }
    },
    components: {list_index},
    methods: {
      fuzhi2(){
        this.fuzhi=!this.fuzhi;
        console.log('fuzhi2fuzhi2fuzhi2');
      },
      add_content (content) {
        if (this.$lodash.isString(content)) {
          this.$router.push('/open/' + content)
        } else {
          console.log(content)
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
