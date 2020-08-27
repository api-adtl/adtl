<template>
    <div>
        <!-- 这是列表 -->

        <div style="line-height: 25px;width: 230px;">
          <Button @click="view_button" size="small"
                  icon="md-eye"
                  type="error">按钮可见</Button>
          <Button @click="f5=!f5" size="small"
                  icon="md-refresh"
                  type="primary" id="f5">刷新</Button>
          <Button @click="view_all" size="small"
                  icon="md-list"
                  type="info">全部展示</Button>
          <Button type="warning" shape="circle"
                  size="small"
                  @click="openopenapiinlist"
                  icon="md-locate">定位当前API</Button>
          <br>
        </div>
        <div style="width: 230px">
            <list_index :f5="f5"
                        :nowapi="nowapi"
                        :zhantie="fuzhi"
                        @fuzhi="fuzhi2" :add="add" @add_content="add_content" dir=".">
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
        fuzhi:false,
        nowapi:''
      }
    },
    components: {list_index},
    computed:{
    },
    methods: {
      /**
       * 打开当前一打开的API所属的位置
       */
      openopenapiinlist(){
        this.nowapi =this.$store.state.nowapi;
      },
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
      view_all(){
        this.$router.push({
          name: 'all_api'
        })
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
