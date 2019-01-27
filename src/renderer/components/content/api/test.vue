<template>
    <div>
        测试组件
        {{api}}<br>
        {{group}}<br>
        {{send}}
        <Button @click="test" size="small" type="primary">进行测试</Button>
        结果 :{{response}}

        <response :response="response"></response>

    </div>
</template>
<script>
  import test from '@/logic/test'
  import response from './response'
  export default {
    name: 'test',
    data () {
      return {
        testob: {},
        response: {}
      }
    },


    props: [
      //数据传参
      'api',
      'group',
      'send'
    ],
    computed: {
      //计算属性
    },
    components: {
      //注册组件
      response
    },
    methods: {
      //方法列表
      test () {
        //进行测试
        console.log('send', this.send)
        this.testob.send(this.send, (data) => {
          console.log('返回数据!', data)
          this.response = this.$lodash.cloneDeep(data)
        })
      },
      init () {
        this.testob = new test(this.api, this.group)

      }
    },
    watch: {
      //监听列表
    },

    created () {
      //创建完成后
      this.init()
    }
  }
</script>

<style>

</style>
